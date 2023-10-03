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
  depositAPY: any;
  variableBorrowAPY: any;
  stableBorrowAPY: any;
  totalAToken: any;
  totalBorrows: any;
  balance: any;
  tokenContractsABI: any;
  selectedReserve: any;
  selectedReserveContract: any;
  poolDataProvider: any;
  poolDataProviderContract: any;
  myContractAddress: any;
  myContractABI: any;
  constructor(private http: HttpClient, private Web3Service: Web3Service) {
    this.web3 = this.Web3Service.getWeb3();

    this.http.get('assets/json/ABIs&Addresses.json').subscribe((data: any) => {
      this.tokenContractsABI = data.tokenContractsABI;
      this.PoolAddressesProvider_AaveAddress = data.PoolAddressesProvider_AaveAddress;
      this.PoolDataProvider_AaveContractABI = data.PoolDataProvider_AaveContractABI;
      this.PoolDataProvider_AaveAddress = data.PoolDataProvider_AaveAddress;
      this.PoolDataProvider_AaveContractABI = data.PoolDataProvider_AaveContractABI;
      this.ReserveDataABI = data.ReserveDataABI;
      this.UiPoolDataProviderV3Address = data.UiPoolDataProviderV3Address;
      this.UiPoolDataProviderV3ABI = data.UiPoolDataProviderV3ABI;
      this.poolDataProviderContract = new this.web3.eth.Contract(this.PoolDataProvider_AaveContractABI, this.PoolDataProvider_AaveAddress);
    });
  }

  async getReserveData() {
    if (localStorage.getItem('walletAddress') != undefined) {
      try {
        this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const UiPoolDataProviderV3Contract = new this.web3.eth.Contract(this.UiPoolDataProviderV3ABI, this.UiPoolDataProviderV3Address);
        const getReservesListData = await UiPoolDataProviderV3Contract.methods.getReservesData(this.PoolAddressesProvider_AaveAddress).call();
        this.reserveData = await Promise.all(getReservesListData[0].map(async (element: any) => {
          const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, element.underlyingAsset);
          this.balance = await tokenContracts.methods.balanceOf(this.accounts[0]).call();
          this.depositAPR = Number(element.liquidityRate) / this.RAY;
          this.variableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
          this.stableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
          this.depositAPY = ((Math.pow((1 + (this.depositAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);
          this.variableBorrowAPY = ((Math.pow((1 + (this.variableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);
          this.stableBorrowAPY = ((Math.pow((1 + (this.stableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2);
          this.totalAToken = ((Number(element.totalPrincipalStableDebt) + Number(element.availableLiquidity)) / Math.pow(10, 18)).toFixed(2)
          this.totalBorrows = ((Number(element.totalPrincipalStableDebt) + Number(element.totalScaledVariableDebt)) / Math.pow(10, 18)).toFixed(2)
          return {
            details: element,
            address: element.underlyingAsset,
            name: element.name,
            balance: this.balance,
            depositAPR: this.depositAPR,
            variableBorrowAPR: this.variableBorrowAPR,
            stableBorrowAPR: this.stableBorrowAPR,
            depositAPY: this.depositAPY,
            variableBorrowAPY: this.variableBorrowAPY,
            stableBorrowAPY: this.stableBorrowAPY,
            totalAToken: this.totalAToken,
            totalBorrows: this.totalBorrows,
          };
        }));
        console.log('reserveData', this.reserveData);
        console.log('getReservesListData', getReservesListData)
        return this.reserveData;
      } catch (error) {
        console.error('Error fetching reserveData:', error);
        throw error;
      }
    }
  }

  getSelectedReserve(selectedReserve: any) {
    this.selectedReserve = selectedReserve;
    this.selectedReserveContract = new this.web3.eth.Contract(this.tokenContractsABI, selectedReserve.address);
  }
}