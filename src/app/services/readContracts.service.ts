import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Service } from './WEb3Service.service';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class readContractsService {
  deposits = new BehaviorSubject<any>(0);
  web3: Web3 | any;
  SECONDS_PER_YEAR = 31536000;
  RAY = Math.pow(10, 27);
  UiPoolDataProviderV3ABI: any
  data = new BehaviorSubject<any>([]);
  UiPoolDataProviderV3Address: any;
  ReserveDataABI: any;
  reserveData: any = [];
  PoolDataProvider_AaveContractABI: any;
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
  rTokenAddress: string[] = ['0x727354712BDFcd8596a3852Fd2065b3C34F4F770',
    '0xd69D402D1bDB9A2b8c3d88D98b9CEaf9e4Cd72d9',
    '0x48a29E756CC1C097388f3B2f3b570ED270423b3d',
    '0x0D914606f3424804FA1BbBE56CCC3416733acEC6',
    '0x0dF5dfd95966753f01cb80E76dc20EA958238C46',
    '0x42C248D137512907048021B30d9dA17f48B5b7B2',
    '0x2dADe5b7df9DA3a7e1c9748d169Cd6dFf77e3d01'];
  rTokenABI: any;
  AaveOracleABI: any;
  stableDebtTokenABI: any;
  variableDebtTokenABI: any;
  UiPoolDataProviderV2V3: any;
  totalAvailable = new BehaviorSubject<any>(0);
  borrows = new BehaviorSubject<any>(0);
  totalDepositArr: any = [];
  totalBorrowsArr: any = [];
  connected: boolean = false;

  constructor(private http: HttpClient, private Web3Service: Web3Service) {
    this.web3 = this.Web3Service.getWeb3();
    this.Web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0xed1eF2fAE2385c221F0e054f982E974bc7Dc08Ce');
    this.loadContractData();
  }

  async loadContractData() {
    try {
      const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
      this.tokenContractsABI = data.tokenContractsABI;
      this.PoolAddressesProvider_AaveAddress = data.PoolAddressesProvider_AaveAddress;
      this.PoolDataProvider_AaveContractABI = data.PoolDataProvider_AaveContractABI;
      this.PoolDataProvider_AaveAddress = data.PoolDataProvider_AaveAddress;
      this.PoolDataProvider_AaveContractABI = data.PoolDataProvider_AaveContractABI;
      this.ReserveDataABI = data.ReserveDataABI;
      this.rTokenABI = data.rTokenABI;
      this.stableDebtTokenABI = data.stableDebtTokenABI;
      this.variableDebtTokenABI = data.variableDebtTokenABI;
      this.AaveOracleABI = data.AaveOracleABI;

      this.poolDataProviderContract = new this.web3.eth.Contract(
        this.PoolDataProvider_AaveContractABI,
        this.PoolDataProvider_AaveAddress
      );
    } catch (error) {
      console.error('Error loading contract data:', error);
      throw error;
    }
  }

  async getReserveData() {
    try {
      if (!localStorage.getItem('walletAddress')) {
        return [];
      }
      const getReserveData = await this.getReserveDATA();
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const reserveDataPromises = getReserveData[0].map(async (element: any) => {
        const tokenContracts = this.getTokenContracts(element.underlyingAsset);
        const rTokenAddress = this.rTokenAddress[getReserveData[0].indexOf(element)];

        const [
          name,
          deposit,
          totalSupply,
          balance,
          decimals,
        ] = await Promise.all([
          tokenContracts.methods.name().call(),
          new this.web3.eth.Contract(this.rTokenABI, rTokenAddress).methods.totalSupply().call(),
          tokenContracts.methods.totalSupply().call(),
          tokenContracts.methods.balanceOf(this.accounts[0]).call(),
          tokenContracts.methods.decimals().call(),
        ]);
        const depositAPR = Number(element.liquidityRate) / this.RAY;
        const variableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
        const stableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
        const variableDebtTokenContract = new this.web3.eth.Contract(this.variableDebtTokenABI, element.variableDebtTokenAddress);
        const stableDebtTokenContract = new this.web3.eth.Contract(this.stableDebtTokenABI, element.stableDebtTokenAddress);
        const [
          variableDebtTokenSupply,
          stableDebtTokenSupply,
          BaseCurrency,
          getAssetPrice,
        ] = await Promise.all([
          variableDebtTokenContract.methods.totalSupply().call(),
          stableDebtTokenContract.methods.totalSupply().call(),
          this.getBaseCurrency(),
          this.getAssetPrice(element.underlyingAsset),
        ]);

        return {
          name: name,
          balance: balance,
          details: element,
          decimals: decimals,
          depositAPR: depositAPR,
          stableBorrowAPR: stableBorrowAPR,
          address: element.underlyingAsset,
          variableBorrowAPR: variableBorrowAPR,
          liquidationPenalty: 15,
          variableDebtTokenSupply: variableDebtTokenSupply,
          deposit: ((Number(deposit)) / (Number(1 + '0'.repeat(Number(decimals)))) * (Number(getAssetPrice) * 0.00000000000001)).toFixed(2),
          depositAPY: ((Math.pow((1 + (depositAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          variableBorrowAPY: ((Math.pow((1 + (variableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          stableBorrowAPY: ((Math.pow((1 + (stableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          assetPrice: (Number(getAssetPrice) / Number(BaseCurrency)).toFixed(2),
          totalSupply: (Number(totalSupply) * (Number(getAssetPrice) * 0.00000000000001) / (Number(1 + '0'.repeat(Number(decimals))))).toFixed(2),
          totalBorrows: ((Number(variableDebtTokenSupply) + Number(stableDebtTokenSupply)) * (Number(getAssetPrice) * 0.00000000000001) / (Number(1 + '0'.repeat(Number(decimals))))).toFixed(2),
        };
      });
      this.reserveData = await Promise.all(reserveDataPromises);
      return this.reserveData;
    } catch (error) {
      console.log(error);
      if (!this.connected) {
        alert("Please Connect to the Wallet");
      }
      console.error('Error fetching reserveData:', error);
      alert('Error fetching Reserves Data. Please try Reloading Again.')
      throw error;
    }
  }

  async getBaseCurrency() {
    const AaveOracleContract = new this.web3.eth.Contract(this.AaveOracleABI, '0xC0cE5De939aaD880b0bdDcf9aB5750a53EDa454b');
    return AaveOracleContract.methods.BASE_CURRENCY_UNIT().call();
  }

  async getAssetPrice(underlyingAsset: any) {
    const AaveOracleContract = new this.web3.eth.Contract(this.AaveOracleABI, '0xC0cE5De939aaD880b0bdDcf9aB5750a53EDa454b');
    return AaveOracleContract.methods.getAssetPrice(underlyingAsset).call();
  }

  getReserveDATA() {
    return this.UiPoolDataProviderV2V3.methods.getReservesData('0x091d52CacE1edc5527C99cDCFA6937C1635330E4').call();
  }

  getTokenContracts(asset: any) {
    return new this.web3.eth.Contract(this.tokenContractsABI, asset);
  }

  getSelectedReserve(selectedReserve: any) {
    this.selectedReserve = selectedReserve;
  }

  dropDown() {
    const selectedAll = document.querySelectorAll(".wrapper-dropdown");
    selectedAll.forEach((selected: any) => {
      const optionsContainer = selected.children[2];
      const optionsList: any = selected.querySelectorAll("div.wrapper-dropdown li");

      selected.addEventListener("click", () => {
        let arrow = selected.children[1];

        if (selected.classList.contains("active")) {
          handleDropdown(selected, arrow, false);
        } else {
          let currentActive = document.querySelector(".wrapper-dropdown.active");

          if (currentActive) {
            let anotherArrow = currentActive.children[1];
            handleDropdown(currentActive, anotherArrow, false);
          }

          handleDropdown(selected, arrow, true);
        }
      });

      // update the display of the dropdown
      for (let o of optionsList) {
        o.addEventListener("click", () => {
          selected.querySelector(".selected-display").innerHTML = o.innerHTML;
        });
      }
    });

    // check if anything else other than the dropdown is clicked
    window.addEventListener("click", function (e: any) {
      if (e.target.closest(".wrapper-dropdown") === null) {
        closeAllDropdowns();
      }
    });

    // close all the dropdowns
    function closeAllDropdowns() {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");
      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        let arrow = selected.children[1];

        handleDropdown(selected, arrow, false);
      });
    }

    // open all the dropdowns
    function handleDropdown(dropdown: any, arrow: any, open: any) {
      if (open) {
        arrow.classList.add("rotated");
        dropdown.classList.add("active");
      } else {
        arrow.classList.remove("rotated");
        dropdown.classList.remove("active");
      }
    }
  }
}