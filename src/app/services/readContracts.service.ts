import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Web3Service } from './WEb3Service.service';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class readContractsService {
  accounts: any;
  rTokenABI: any;
  depositAPY: any;
  depositAPR: any;
  totalAToken: any;
  web3: Web3 | any;
  totalBorrows: any;
  AaveOracleABI: any;
  myContractABI: any;
  balance: Number = 0;
  ReserveDataABI: any;
  selectedReserve: any;
  stableBorrowAPR: any;
  stableBorrowAPY: any;
  reserveData: any = [];
  variableBorrowAPR: any;
  myContractAddress: any;
  tokenContractsABI: any;
  variableBorrowAPY: any;
  RAY = Math.pow(10, 27);
  stableDebtTokenABI: any;
  variableDebtTokenABI: any;
  totalBorrowsArr: any = [];
  totalDepositArr: any = [];
  connected: boolean = false;
  UiPoolDataProviderV2V3: any;
  SECONDS_PER_YEAR = 31536000;
  UiPoolDataProviderV3ABI: any;
  selectedReserveContract: any;
  UiPoolDataProviderV3Address: any;
  data = new BehaviorSubject<any>([]);
  borrows = new BehaviorSubject<any>(0);
  deposits = new BehaviorSubject<any>(0);
  totalAvailable = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, private Web3Service: Web3Service) {
    this.web3 = this.Web3Service.getWeb3();
    this.Web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    });
    this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
    this.loadContractData();
  }

  async loadContractData() {
    try {
      const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
      this.rTokenABI = data.rTokenABI;
      this.AaveOracleABI = data.AaveOracleABI;
      this.ReserveDataABI = data.ReserveDataABI;
      this.tokenContractsABI = data.tokenContractsABI;
      this.stableDebtTokenABI = data.stableDebtTokenABI;
      this.variableDebtTokenABI = data.variableDebtTokenABI;
    } catch (error) {
      console.error('Error loading contract data:', error);
      throw error;
    }
  }

  async getReserveData() {
    try {
      const getReserveData = await this.getReserveDATA();
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const reserveDataPromises = getReserveData[0].map(async (element: any) => {
        const tokenContracts = this.getTokenContracts(element.underlyingAsset);
        const aTOkenContract = new this.web3.eth.Contract([{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "BalanceTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "pool", "type": "address" }, { "indexed": false, "internalType": "address", "name": "treasury", "type": "address" }, { "indexed": false, "internalType": "address", "name": "incentivesController", "type": "address" }, { "indexed": false, "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "indexed": false, "internalType": "string", "name": "aTokenName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "ATOKEN_REVISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EIP712_REVISION", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "POOL", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RESERVE_TREASURY_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNDERLYING_ASSET_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "receiverOfUnderlying", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAssetPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getIncentivesController", "outputs": [{ "internalType": "contract IAaveIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getScaledUserBalanceAndSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "handleRepayment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPool", "name": "pool", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }, { "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "contract IAaveIncentivesController", "name": "incentivesController", "type": "address" }, { "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "internalType": "string", "name": "aTokenName", "type": "string" }, { "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mintToTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "scaledBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "scaledTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferOnLiquidation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferUnderlyingTo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }], element.aTokenAddress);

        const [
          name,
          decimals,
          totalSupply,
          balance,
          deposit,
        ] = await Promise.all([
          tokenContracts.methods.name().call(),
          tokenContracts.methods.decimals().call(),
          aTOkenContract.methods.totalSupply().call(),
          tokenContracts.methods.balanceOf(this.accounts[0]).call(),
          aTOkenContract.methods.totalSupply().call()
        ]);
        const depositAPR = Number(element.liquidityRate) / this.RAY;
        const stableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
        const variableBorrowAPR = Number(element.variableBorrowRate) / this.RAY;
        const stableDebtTokenContract = new this.web3.eth.Contract(this.stableDebtTokenABI, element.stableDebtTokenAddress);
        const variableDebtTokenContract = new this.web3.eth.Contract(this.variableDebtTokenABI, element.variableDebtTokenAddress);
        const [
          BaseCurrency,
          getAssetPrice,
          stableDebtTokenSupply,
          variableDebtTokenSupply,
        ] = await Promise.all([
          this.getBaseCurrency(),
          this.getAssetPrice(element.underlyingAsset),
          stableDebtTokenContract.methods.totalSupply().call(),
          variableDebtTokenContract.methods.totalSupply().call(),
        ]);

        console.log(totalSupply)
        return {
          name: name,
          details: element,
          balance: balance,
          decimals: decimals,
          depositAPR: depositAPR,
          address: element.underlyingAsset,
          stableBorrowAPR: stableBorrowAPR,
          variableBorrowAPR: variableBorrowAPR,
          variableDebtTokenSupply: variableDebtTokenSupply,
          assetPrice: (Number(getAssetPrice) / Number(BaseCurrency)).toFixed(2),
          depositAPY: ((Math.pow((1 + (depositAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          stableBorrowAPY: ((Math.pow((1 + (stableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          variableBorrowAPY: ((Math.pow((1 + (variableBorrowAPR / this.SECONDS_PER_YEAR)), this.SECONDS_PER_YEAR) - 1) * 100).toFixed(2),
          deposit: ((Number(deposit)) / (Number(1 + '0'.repeat(Number(decimals)))) * (Number(getAssetPrice) / 100000000)).toFixed(2),
          totalSupply: (Number(totalSupply) * (Number(getAssetPrice) / 100000000) / (Number(1 + '0'.repeat(Number(decimals))))).toFixed(2),
          totalBorrows: ((Number(variableDebtTokenSupply) + Number(stableDebtTokenSupply)) * (Number(getAssetPrice) / 100000000) / (Number(1 + '0'.repeat(Number(decimals))))).toFixed(2)
        };
      });
      this.reserveData = await Promise.all(reserveDataPromises);
      console.log('Reserves Data :', this.reserveData)
      return this.reserveData;
    }
    catch (error) {
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
    const AaveOracleContract = new this.web3.eth.Contract(this.AaveOracleABI, '0x166267abCDa4A903A0d187D151Da73C14BDfF1a8');
    return AaveOracleContract.methods.BASE_CURRENCY_UNIT().call();
  }

  async getAssetPrice(underlyingAsset: any) {
    const AaveOracleContract = new this.web3.eth.Contract(this.AaveOracleABI, '0x166267abCDa4A903A0d187D151Da73C14BDfF1a8');
    return AaveOracleContract.methods.getAssetPrice(underlyingAsset).call();
  }

  getReserveDATA() {
    return this.UiPoolDataProviderV2V3.methods.getReservesData('0x5743f572A55CbB84c035903D0e888583CdD508c3').call();
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