import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Service } from './WEb3Service.service';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class readContractsService {
  web3: Web3 | any;
  SECONDS_PER_YEAR = 31536000;
  RAY = Math.pow(10, 27);
  UiPoolDataProviderV3ABI: any
  UiPoolDataProviderV3Address: any
  ReserveDataABI: any
  getReservesList: any;
  reserveData: any = [];
  PoolDataProvider_AaveContractABI: any
  depositAPR: any;
  variableBorrowAPR: any;
  stableBorrowAPR: any;
  accounts: any;
  PoolAddressesProvider_AaveAddress: any;
  PoolDataProvider_AaveAddress: any;

  constructor(private http: HttpClient,private Web3Service: Web3Service) {
    this.web3 = this.Web3Service.getWeb3();
    this.http.get('assets/json/ABIs&Addresses.json').subscribe((data: any) => {
      this.PoolAddressesProvider_AaveAddress = data.PoolAddressesProvider_AaveAddress;
      this.PoolDataProvider_AaveAddress = data.PoolDataProvider_AaveAddress;
      this.PoolDataProvider_AaveContractABI = data.PoolDataProvider_AaveContractABI;
      this.ReserveDataABI = data.ReserveDataABI;
      this.UiPoolDataProviderV3Address = data.UiPoolDataProviderV3Address;
      this.UiPoolDataProviderV3ABI = data.UiPoolDataProviderV3ABI;
    });
  }

  async getReserveData() {
    try {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const UiPoolDataProviderV3Contract = new this.web3.eth.Contract(this.UiPoolDataProviderV3ABI, this.UiPoolDataProviderV3Address);
      const getReservesList = await UiPoolDataProviderV3Contract.methods.getReservesList(this.PoolAddressesProvider_AaveAddress).call();
      this.getReservesList = getReservesList;

      const reservePromises = this.getReservesList.map(async (element: any) => {
        const PoolDataProvider_AaveContract = new this.web3.eth.Contract(this.PoolDataProvider_AaveContractABI, this.PoolDataProvider_AaveAddress);
        const details = await PoolDataProvider_AaveContract.methods.getReserveData(element).call();
        const Reserve = new this.web3.eth.Contract(this.ReserveDataABI, element);
        const [symbol, name, decimals, owner, totalSupply, allowance, balanceOf] = await Promise.all([
          Reserve.methods.symbol().call(),
          Reserve.methods.name().call(),
          Reserve.methods.decimals().call(),
          Reserve.methods.owner().call(),
          Reserve.methods.totalSupply().call(),
          Reserve.methods.allowance(this.accounts[0], this.accounts[0]).call(),
          Reserve.methods.balanceOf(this.accounts[0]).call()
        ]);

        const Borrows = Number(details.totalStableDebt + details.totalVariableDebt);
        details.totalBorrows = (Borrows / Math.pow(10, 18)).toFixed(2);
        details.totalAToken = (Number(details.totalAToken) / Math.pow(10, 18)).toFixed(2);
        details.depositAPR = Number(details.liquidityRate) / this.RAY;
        details.variableBorrowAPR = Number(details.variableBorrowRate) / this.RAY;
        details.stableBorrowAPR = Number(details.variableBorrowRate) / this.RAY;
        details.depositAPY = ((Math.pow((1 + (details.depositAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);
        details.variableBorrowAPY = ((Math.pow((1 + (details.variableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);

        details.stableBorrowAPY = ((Math.pow((1 + (details.stableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);

        return {
          address: element,
          name,
          symbol,
          decimals,
          owner,
          totalSupply,
          allowance,
          balanceOf,
          details
        };
      });

      this.reserveData = await Promise.all(reservePromises);
      console.log('reserveData', this.reserveData);
      return this.reserveData;
    } catch (error) {
      console.error('Error fetching reserveData:', error);
      throw error;
    }
  }
}