import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  web3: any;
  reserve: any;
  address: any;
  accounts: any;
  ContractData: any;
  balanceAsset: any;
  Addresscontract: any;
  tokenContractsABI: any;
  depositedAsset: any = [];
  connected: boolean = false;
  UiPoolDataProviderV2V3: any;
  showDetails: boolean = false;
  RadiantLendingPoolV2ABI: any;
  RadiantLendingPoolV2Address: any;
  CurrentchainId: any = localStorage.getItem('chainId');
  networkName: string | null = localStorage.getItem('networkName');
  icons: string[] = ["assets/alphalogo.png", "assets/images/busd-c4257f9b.svg", "assets/images/ic3.png"]
  constructor(private web3Service: Web3Service, private http: HttpClient, private readContractsService: readContractsService, private router: Router) {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    });
    this.networkName == null ? this.networkName = 'Mumbai Testnet' : '';
    // this.reserve = this.readContractsService.selectedReserve;
    // this.reserve.balance = (Number(this.reserve.balance) / 1000000000000000000).toFixed(2);
    this.web3 = this.web3Service.getWeb3();
    this.getUserReservesData();
  }
  async getUserReservesData() {
    if (this.networkName == 'Mumbai Testnet') {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // const lendingPoolConfigurator = new this.web3.eth.Contract([{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "proxy", "type": "address" }, { "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "ATokenUpgraded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "BorrowingDisabledOnReserve", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "stableRateEnabled", "type": "bool" }], "name": "BorrowingEnabledOnReserve", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "ltv", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "liquidationThreshold", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "liquidationBonus", "type": "uint256" }], "name": "CollateralConfigurationChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "ReserveActivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "ReserveDeactivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "decimals", "type": "uint256" }], "name": "ReserveDecimalsChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "factor", "type": "uint256" }], "name": "ReserveFactorChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "ReserveFrozen", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "aToken", "type": "address" }, { "indexed": false, "internalType": "address", "name": "stableDebtToken", "type": "address" }, { "indexed": false, "internalType": "address", "name": "variableDebtToken", "type": "address" }, { "indexed": false, "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }], "name": "ReserveInitialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "address", "name": "strategy", "type": "address" }], "name": "ReserveInterestRateStrategyChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "ReserveUnfrozen", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "proxy", "type": "address" }, { "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "StableDebtTokenUpgraded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "StableRateDisabledOnReserve", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }], "name": "StableRateEnabledOnReserve", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "proxy", "type": "address" }, { "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "VariableDebtTokenUpgraded", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "activateReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "aTokenImpl", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenImpl", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenImpl", "type": "address" }, { "internalType": "uint8", "name": "underlyingAssetDecimals", "type": "uint8" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }, { "internalType": "address", "name": "incentivesController", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "string", "name": "underlyingAssetName", "type": "string" }, { "internalType": "string", "name": "aTokenName", "type": "string" }, { "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "internalType": "string", "name": "variableDebtTokenName", "type": "string" }, { "internalType": "string", "name": "variableDebtTokenSymbol", "type": "string" }, { "internalType": "string", "name": "stableDebtTokenName", "type": "string" }, { "internalType": "string", "name": "stableDebtTokenSymbol", "type": "string" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "internalType": "struct ILendingPoolConfigurator.InitReserveInput[]", "name": "input", "type": "tuple[]" }], "name": "batchInitReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "ltv", "type": "uint256" }, { "internalType": "uint256", "name": "liquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "liquidationBonus", "type": "uint256" }], "name": "configureReserveAsCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "deactivateReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "disableBorrowingOnReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "disableReserveStableRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }], "name": "enableBorrowingOnReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "enableReserveStableRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "freezeReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "val", "type": "bool" }], "name": "setPoolPause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }], "name": "setReserveFactor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "rateStrategyAddress", "type": "address" }], "name": "setReserveInterestRateStrategyAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "unfreezeReserve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }, { "internalType": "address", "name": "incentivesController", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "internalType": "struct ILendingPoolConfigurator.UpdateATokenInput", "name": "input", "type": "tuple" }], "name": "updateAToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "incentivesController", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "internalType": "struct ILendingPoolConfigurator.UpdateDebtTokenInput", "name": "input", "type": "tuple" }], "name": "updateStableDebtToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "incentivesController", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "internalType": "struct ILendingPoolConfigurator.UpdateDebtTokenInput", "name": "input", "type": "tuple" }], "name": "updateVariableDebtToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], '0x308AE4EdA4dD95c23a3c2968D6951ac3f589773B')
      // const batchInitReserve = lendingPoolConfigurator.methods.batchInitReserve([['0xEf9bBa295a4b3acB014304C4Ada27a3D190E3BB2'], ['0x6695EdB1671d78E434224977709911BB1F5AC1A9'], ['0xf67a2D777bDC066793aD79873fCfA33Fb01ab619'], ['6'], ['0xc6F3222E3a4fC4Fda7170f34FE8C84FAa7A20e4C'], ['0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2'], ['0x58F3499Ce37791fef39D0b6F6339c60844895AFc'], ['0x530C6d01F7Ea4f968CEB9053708431a089A9a352'], ['10'], ['USDT'], ['USDTATOKEN'], ['USDTATOKEN'], ['USDTVDTOKEN'], ['USDTVDTOKEN'], ['USDTSDTOKEN'], ['USDTSDTOKEN'], ['0x10']]).send(
      //   {
      //     from: this.accounts[0],
      //     data: lendingPoolConfigurator.methods.batchInitReserve([['0xEf9bBa295a4b3acB014304C4Ada27a3D190E3BB2'], ['0x6695EdB1671d78E434224977709911BB1F5AC1A9'], ['0xf67a2D777bDC066793aD79873fCfA33Fb01ab619'], ['6'], ['0xc6F3222E3a4fC4Fda7170f34FE8C84FAa7A20e4C'], ['0x1fdE0eCc619726f4cD597887C9F3b4c8740e19e2'], ['0x58F3499Ce37791fef39D0b6F6339c60844895AFc'], ['0x530C6d01F7Ea4f968CEB9053708431a089A9a352'], ['10'], ['USDT'], ['USDTATOKEN'], ['USDTATOKEN'], ['USDTVDTOKEN'], ['USDTVDTOKEN'], ['USDTSDTOKEN'], ['USDTSDTOKEN'], ['0x10']]).encodeABI()
      //   }
      // );
      // batchInitReserve.then(console.log)

      const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise()
      this.tokenContractsABI = data.tokenContractsABI;
      this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
      this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
      (this.readContractsService.getReserveData().then((data: any) => {
        this.ContractData = data;
        const sortedContractData = this.ContractData.sort((a: any, b: any) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.ContractData = sortedContractData;
      }))

      this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
      const depositedAssetContract = await this.UiPoolDataProviderV2V3.methods.getUserReservesData('0x5743f572A55CbB84c035903D0e888583CdD508c3', localStorage.getItem('walletAddress')).call();

      depositedAssetContract[0].forEach(async (res: any) => {
        const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, res.underlyingAsset);
        const balanceAsset = tokenContracts.methods.balanceOf(this.accounts[0]).call();
        balanceAsset.then((res: any) => {
          this.balanceAsset = (Number(res) / 1000000000000000000).toFixed(2);
        })
        debugger
        if (res.scaledATokenBalance != 0) {
          const decimals = await tokenContracts.methods.decimals().call();
          const name = await tokenContracts.methods.name().call();
          const totalSupply = await tokenContracts.methods.totalSupply().call();
          const balance = (Number(res.scaledATokenBalance) / Math.pow(10, Number(decimals))).toFixed(2);
          this.depositedAsset.push({
            decimals: decimals,
            name: name,
            totalSupply: totalSupply,
            balance: balance
          })
          console.log(this.depositedAsset, this.balanceAsset)
          const sortedDepositedAsset = this.depositedAsset.sort((a: any, b: any) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          this.depositedAsset = sortedDepositedAsset;
        }
        else {
          this.ContractData = [];
          this.depositedAsset = [];
        }
      }
      )
    }
  }
  async setCurrentchainId(chainId: string) {
    localStorage.setItem('networkName', chainId);
    this.CurrentchainId = chainId;
    chainId == '0xa4b1' ? this.networkName = 'Arbitrum' : chainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Mumbai Testnet';

    if (this.networkName == 'Mumbai Testnet') {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise()
      this.tokenContractsABI = data.tokenContractsABI;
      this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
      this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
      (this.readContractsService.getReserveData().then((data: any) => {
        this.ContractData = data;
      }))

      this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
      const depositedAssetContract = await this.UiPoolDataProviderV2V3.methods.getUserReservesData('0x5743f572A55CbB84c035903D0e888583CdD508c3', localStorage.getItem('walletAddress')).call();
      depositedAssetContract[0].forEach(async (res: any) => {
        const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, res.underlyingAsset);
        const balanceAsset = tokenContracts.methods.balanceOf(this.accounts[0]).call();
        balanceAsset.then((res: any) => {
          this.balanceAsset = (Number(res) / 1000000000000000000).toFixed(2);
        })
        debugger
        if (res.scaledATokenBalance != 0) {
          const decimals = await tokenContracts.methods.decimals().call();
          const name = await tokenContracts.methods.name().call();
          const totalSupply = await tokenContracts.methods.totalSupply().call();
          const balance = (Number(res.scaledATokenBalance) / Math.pow(10, Number(decimals))).toFixed(2);
          this.depositedAsset.push({
            decimals: decimals,
            name: name,
            totalSupply: totalSupply,
            balance: balance
          })
        }
      })
    }
  }

  goToAsset(selectedAsset: any, img: string) {
    this.showDetails = true;
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    selectedAsset.icon = img;
    this.readContractsService.getSelectedReserve(selectedAsset);
    this.router.navigateByUrl('/details');
  }

  async supplyAmount(reserveAddress: string) {
    this.address = localStorage.getItem('walletAddress');
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, reserveAddress);
    const decimals = await this.Addresscontract.methods.decimals().call();
    const amount = 1 * Math.pow(10, Number(decimals));
    const balance = await this.Addresscontract.methods.balanceOf(localStorage.getItem('walletAddress')).call();
    // if (Number(balance) < Number(amount)) {
    //   throw new Error('Insufficient balance to perform the transaction.');
    // }
    const Approve = await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).send({
      from: localStorage.getItem('walletAddress'),
      data: await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).encodeABI()
    });
    console.log('Transaction hash:', Approve);
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const referralCode = 0;
    try {
      const deposit = await Pool_Proxy_Aave_Contract.methods.deposit(reserveAddress, amount.toString(), this.address, referralCode.toString()).send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.deposit(reserveAddress, amount.toString(), this.address, referralCode.toString()).encodeABI(),
        gas: 1000000
      });

      const receipt = await this.web3.eth.getTransactionReceipt(deposit.transactionHash);
      if (receipt && receipt.status) {
        alert("Transaction Successfull");
        console.log('Transaction succeeded!');
      }
      console.log('Transaction hash:', deposit);
    } catch (error) {
      alert(error);
      console.error('Error:', error);
    }
  }

  async withdrawAmount() {
    this.address = localStorage.getItem('walletAddress');
    const amount = 1 * Math.pow(10, 18);
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    try {
      const deposit = await Pool_Proxy_Aave_Contract.methods.withdraw(this.depositedAsset.address, amount.toString(), '0x4d77242918E4f4fc182069C984cB675FFb31db3c').send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.withdraw(this.depositedAsset.address, amount.toString(), '0x4d77242918E4f4fc182069C984cB675FFb31db3c').encodeABI(),
        gas: 1000000
      });

      const receipt = await this.web3.eth.getTransactionReceipt(deposit.transactionHash);
      if (receipt && receipt.status) {
        alert("Transaction Successfull");
        console.log('Transaction succeeded!');
      }
      console.log('Transaction hash:', deposit);
    } catch (error) {
      alert(error);
      console.error('Error:', error);
    }
  }
}