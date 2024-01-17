import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import { CheckwalletConnectService } from "src/app/services/checkwallet-connect.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  web3: any;
  Form: any;
  reserve: any;
  address: any;
  accounts: any;
  borrows: any = 0;
  deposits: any = 0;
  balanceAsset: any;
  selectedReserve: any;
  transactionType: any;
  Addresscontract: any;
  tokenContractsABI: any;
  totalAvailable: any = 0;
  borrowedAsset: any = [];
  depositedAsset: any = [];
  networkName: string = '';
  selectedRepayReserve: any;
  totalBorrowsArr: any = [];
  totalDepositArr: any = [];
  showError: boolean = false;
  connected: boolean = false;
  UiPoolDataProviderV2V3: any;
  SupplyContractData: any = [];
  borrowContractData: any = [];
  showDetails: boolean = false;
  showSpinner: boolean = false;
  spinnerTimer: boolean = true;
  RadiantLendingPoolV2ABI: any;
  RadiantLendingPoolV2Address: any;
  selectedSupplyReserve: string = '';
  selectedBorrowReserve: string = '';
  selectedWithdrawReserve: string = '';
  CurrentchainId: any = localStorage.getItem('chainId');
  icons: string[] = ["assets/alphalogo.png", "assets/images/busd-c4257f9b.svg", "assets/images/ic3.png"];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder, private web3Service: Web3Service,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, private readContractsService: readContractsService, private checkConnectStatus: CheckwalletConnectService, private router: Router) {
    setTimeout(() => {
      this.spinnerTimer = false;
    }, 2500);
    this.Form = this.fb.group({
      amount: [null, Validators.required],
      withdrawTo: ['', Validators.required]
    });
    this.networkName == null ? this.networkName = 'Select Network' : '';
    this.web3 = this.web3Service.getWeb3();
  }

  ngOnInit() {
    this.loadContracts();
    this.web3Service.walletAddress.subscribe((address: string) => {
      this.accounts = address;
      this.address = address;
      this.getUserReservesData();
    });
    this.web3Service.connected.subscribe((res: any) => {
      this.connected = res;
    });
    this.networkName == null ? this.networkName = 'Select Network' : '';
  }

  async loadContracts() {
    const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise()
    this.tokenContractsABI = data.tokenContractsABI;
    this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
    this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
    this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
  }

  async getUserReservesData() {
    try {
      this.resetData();
      const CurrentchainId = await this.web3.eth.net.getId();
      this.setNetworkName(CurrentchainId);
      this.cdr.detectChanges();

      if (this.networkName === 'Mumbai Testnet' && this.connected) {
        const data = await this.readContractsService.getReserveData();
        this.updateIcons(data);
        this.borrowContractData = [...data];
        this.SupplyContractData = [...data];
        this.calculateMarksetSize();

        const depositedAssetContract = await this.UiPoolDataProviderV2V3.methods
          .getUserReservesData('0x5743f572A55CbB84c035903D0e888583CdD508c3', this.accounts)
          .call();
        this.cdr.detectChanges();
        const promises = depositedAssetContract[0].map(async (res: any) => {
          const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, res.underlyingAsset);
          const depositedAsset = [];
          const borrowedAsset = [];

          const [balanceAsset, decimals, name, totalSupply, scaledATokenBalance, scaledVariableDebt] = await Promise.all([
            tokenContracts.methods.balanceOf(this.accounts).call(),
            tokenContracts.methods.decimals().call(),
            tokenContracts.methods.name().call(),
            tokenContracts.methods.totalSupply().call(),
            res.scaledATokenBalance,
            res.scaledVariableDebt,
          ]);

          const balance = (Number(scaledATokenBalance) / Math.pow(10, Number(decimals))).toFixed(2);
          const isDepositedAssetExists = this.depositedAsset.some((item: any) => item.address === res.underlyingAsset);
          const isBorrowedAssetExists = this.borrowedAsset.some((item: any) => item.address === res.underlyingAsset);

          if (Number(scaledATokenBalance) !== 0 && !isDepositedAssetExists) {
            depositedAsset.push({
              address: res.underlyingAsset,
              decimals: decimals,
              name: name,
              totalSupply: totalSupply,
              balance: balance,
            });
            this.cdr.detectChanges();
          }

          if (Number(scaledVariableDebt) !== 0 && !isBorrowedAssetExists) {
            borrowedAsset.push({
              address: res.underlyingAsset,
              name: name,
            });
            this.cdr.detectChanges();
          }
          this.depositedAsset.push(...depositedAsset);
          this.borrowedAsset.push(...borrowedAsset);
          this.cdr.detectChanges();
        });

        await Promise.all(promises);
        this.getDepositedAsset();
        this.getBorrowedAsset();
        this.sortedData();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error in getUserReservesData:', error);
    } finally {
      if (!this.connected) {
        this.resetData();
      }
      this.cdr.detectChanges();
    }
  }

  getBorrowedAsset() {
    this.borrowedAsset.forEach((item: any) => {
      if (item.name == 'Alpha') {
        item.icon = "assets/alphalogo.png";
      }
      if (item.name == 'BUSD Token') {
        item.icon = "assets/images/busd-c4257f9b.svg";
      }
      if (item.name == 'WETH') {
        item.icon = "assets/images/eth-a91aa368.svg";
      }
      if (item.name == 'USDT') {
        item.icon = "assets/images/ic3.png";
      }
      this.SupplyContractData.forEach(async (data: any) => {
        if (data.name == item.name) {
          const variableDebtToken = new this.web3.eth.Contract([{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "fromUser", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toUser", "type": "address" }, { "indexed": false, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BorrowAllowanceDelegated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "pool", "type": "address" }, { "indexed": false, "internalType": "address", "name": "incentivesController", "type": "address" }, { "indexed": false, "internalType": "uint8", "name": "debtTokenDecimals", "type": "uint8" }, { "indexed": false, "internalType": "string", "name": "debtTokenName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "debtTokenSymbol", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEBT_TOKEN_REVISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "POOL", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNDERLYING_ASSET_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approveDelegation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fromUser", "type": "address" }, { "internalType": "address", "name": "toUser", "type": "address" }], "name": "borrowAllowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAssetPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getIncentivesController", "outputs": [{ "internalType": "contract IAaveIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getScaledUserBalanceAndSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPool", "name": "pool", "type": "address" }, { "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "contract IAaveIncentivesController", "name": "incentivesController", "type": "address" }, { "internalType": "uint8", "name": "debtTokenDecimals", "type": "uint8" }, { "internalType": "string", "name": "debtTokenName", "type": "string" }, { "internalType": "string", "name": "debtTokenSymbol", "type": "string" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "onBehalfOf", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "scaledBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "scaledTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }], data['details'].variableDebtTokenAddress);
          const balance = await variableDebtToken.methods.balanceOf(this.accounts).call();
          const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, item.address);
          const decimals = await tokenContracts.methods.decimals().call();
          item.totalBorrows = (Number(balance) / (Math.pow(10, Number(decimals)))).toFixed(6);
          item.variableBorrowAPY = data.variableBorrowAPY;
          this.cdr.detectChanges();
        }
      })
    })
    this.cdr.detectChanges();
  }

  getDepositedAsset() {
    this.depositedAsset.forEach((item: any) => {
      const ttlSpply = Math.floor(item.balance);
      if (Number.isNaN(ttlSpply)) {
      }
      else {
        if (ttlSpply.toString().length == 1 || ttlSpply.toString().length == 2 || ttlSpply.toString().length == 3) {
          item.balance = ttlSpply;
        }
        if (ttlSpply.toString().length == 4 || ttlSpply.toString().length == 5 || ttlSpply.toString().length == 6) {
          item.balance = (ttlSpply / 1000).toFixed(2) + 'k';
        }
        if (ttlSpply.toString().length == 7 || ttlSpply.toString().length == 8) {
          item.balance = (ttlSpply / 1000000).toFixed(2) + 'M';
        }
        if (ttlSpply.toString().length > 9) {
          item.balance = (ttlSpply / 1000000000).toFixed(2) + 'B';
        }
      }
      if (item.name == 'Alpha') {
        item.icon = "assets/alphalogo.png";
      }
      if (item.name == 'BUSD Token') {
        item.icon = "assets/images/busd-c4257f9b.svg";
      }
      if (item.name == 'USDT') {
        item.icon = "assets/images/ic3.png";
      }
      if (item.name == 'WETH') {
        item.icon = "assets/images/eth-a91aa368.svg";
      }
      this.SupplyContractData.forEach((data: any) => {
        if (data.name == item.name) {
          item.depositAPY = data.depositAPY;
        }
      })
    })
    this.cdr.detectChanges();
  }

  updateIcons(data: any) {
    data.forEach((item: any) => {
      if (item.name == 'Alpha') {
        item.icon = "assets/alphalogo.png";
      }
      if (item.name == 'BUSD Token') {
        item.icon = "assets/images/busd-c4257f9b.svg";
      }
      if (item.name == 'USDT') {
        item.icon = "assets/images/ic3.png";
      }
      if (item.name == 'WETH') {
        item.icon = "assets/images/eth-a91aa368.svg";
      }
    })
    this.cdr.detectChanges();
  }

  calculateMarksetSize() {
    this.totalDepositArr = [];
    this.totalBorrowsArr = [];
    this.SupplyContractData.forEach((item: any) => {
      this.totalDepositArr.push(item.deposit);
      this.totalBorrowsArr.push(item.totalBorrows);
    })
    const sumOfDeposits = this.totalDepositArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
    this.deposits = sumOfDeposits.toFixed(0);
    const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
    this.borrows = sumOfBorrows.toFixed(0);
    this.totalAvailable = (Number(this.deposits) - Number(this.borrows)).toFixed(0);
    localStorage.setItem('borrows', JSON.stringify(this.borrows));
    localStorage.setItem('deposits', JSON.stringify(this.deposits));
    localStorage.setItem('totalAvailable', JSON.stringify(this.totalAvailable));
    this.readContractsService.borrows.next(this.borrows);
    this.readContractsService.deposits.next(this.deposits);
    this.readContractsService.totalAvailable.next(this.totalAvailable);
    this.cdr.detectChanges();
  }

  sortedData() {
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
    const sortedBorrowedAsset = this.borrowedAsset.sort((a: any, b: any) => {
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
    const sortedContractData = this.SupplyContractData.sort((a: any, b: any) => {
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
    this.SupplyContractData = sortedContractData;
    this.borrowContractData = sortedContractData;
    this.depositedAsset = sortedDepositedAsset;
    this.borrowedAsset = sortedBorrowedAsset;
    this.cdr.detectChanges();
  }

  setNetworkName(currentChainId: any) {
    if (currentChainId == 80001n) {
      this.networkName = 'Mumbai Testnet';
    }
    if (currentChainId == 42161n) {
      this.networkName = 'Arbitrum';
    }
    if (currentChainId == 137n) {
      this.networkName = 'Polygon Mainnet';
    }
    else if (currentChainId != 42161n && currentChainId != 137n && currentChainId != 80001n) {
      this.networkName = 'Select Network';
    }
  }

  resetData() {
    this.borrowedAsset = [];
    this.depositedAsset = [];
    this.totalBorrowsArr = [];
    this.totalDepositArr = [];
    this.SupplyContractData = [];
    this.borrowContractData = [];
  }

  async setCurrentchainId(chainId: string) {
    localStorage.setItem('networkName', chainId);
    this.CurrentchainId = chainId;
    chainId == '0xa4b1' ? this.networkName = 'Arbitrum' : chainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Mumbai Testnet';
    if (this.networkName == 'Mumbai Testnet') {
      if (this.borrowContractData[0] == undefined && this.SupplyContractData[0] == undefined) {
        this.getUserReservesData();
      }
    }
  }

  goToAsset(selectedAsset: any, img: string) {
    this.showDetails = true;
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    selectedAsset.icon = img;
    this.readContractsService.getSelectedReserve(selectedAsset);
    this.router.navigateByUrl('/details');
  }

  openDialog(reserveAddress: string, transactionType: any) {
    this.transactionType = transactionType;
    if (this.transactionType == 'Withdraw') {
      this.selectedWithdrawReserve = reserveAddress;
    }
    if (this.transactionType == 'Supply') {
      this.selectedSupplyReserve = reserveAddress;
    }
    if (this.transactionType == 'Borrow') {
      this.selectedBorrowReserve = reserveAddress;
    }
    if (this.transactionType == 'Repay') {
      this.selectedRepayReserve = reserveAddress;
    }
    const element: any = document.getElementById("myModal");
    element.style.display = "block";
  }

  closeDialog() {
    const element: any = document.getElementById("myModal")
    element.style.display = "none";
    this.Form.reset();
    this.showError = false;
    this.selectedWithdrawReserve = '';
    this.selectedSupplyReserve = '';
    this.selectedBorrowReserve = '';
    this.showSpinner = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.Form.get(controlName);
    return control?.touched && control?.invalid;
  }

  submitt() {
    this.address = localStorage.getItem('walletAddress');
    if (this.Form.get('amount').invalid) {
      this.showError = true;
      return;
    }
    else {
      this.showError = false;
    }
    const element: any = document.getElementById("myModal")
    element.style.display = "none";
    if (this.transactionType == 'Supply') {
      this.supplyAsset();
    }

    if (this.transactionType == 'Withdraw') {
      this.withdrawAsset();
    }

    if (this.transactionType == 'Repay') {
      this.repayAsset();
    }

    if (this.transactionType == 'Borrow') {
      this.borrowAsset();
    }
  }

  async supplyAsset() {
    this.showSpinner = true;
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.selectedSupplyReserve);
    const decimals = await this.Addresscontract.methods.decimals().call();
    const amount = this.Form.get('amount').value * Math.pow(10, Number(decimals));
    this.Form.reset();
    try {
      const Approve = await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).send({
        from: localStorage.getItem('walletAddress'),
        data: await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).encodeABI()
      });
      const receipt = await this.web3.eth.getTransactionReceipt(Approve.transactionHash);
      if (receipt && receipt.status) {
        Swal.fire({
          title: "Transaction Approved Successfully",
          icon: "success",
          timer: 1500
        });
        console.log('Transaction succeeded!');
      }
      console.log('Transaction hash:', Approve);
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.selectedSupplyReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
      else {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.Form.reset();
      this.selectedSupplyReserve = '';
      return;
    }
    this.address = localStorage.getItem('walletAddress')
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const referralCode = 0;
    try {
      const deposit = await Pool_Proxy_Aave_Contract.methods.deposit(this.selectedSupplyReserve, amount.toString(), this.address, referralCode.toString()).send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.deposit(this.selectedSupplyReserve, amount.toString(), this.address, referralCode.toString()).encodeABI(),
        gas: 1000000
      });
      this.showSpinner = false;
      const receipt = await this.web3.eth.getTransactionReceipt(deposit.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.selectedSupplyReserve = '';
        Swal.fire({
          title: "Transaction Successfull",
          icon: "success",
        });
        console.log('Transaction succeeded!');
        this.resetData();
        this.deposits = 0;
        this.borrows = 0;
        this.getUserReservesData();
        this.totalAvailable = 0;
        this.calculateMarksetSize();
        this.showSpinner = false;
        this.selectedSupplyReserve = '';
        console.log('Transaction hash:', deposit);
      }
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.selectedSupplyReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
      console.error('Error:', innerErr);
    }
    this.showSpinner = false;
    this.Form.reset();
    this.selectedSupplyReserve = '';
  }

  async withdrawAsset() {
    this.showSpinner = true;
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.selectedWithdrawReserve);
    const decimals = await this.Addresscontract.methods.decimals().call();
    const a = this.Form.get('amount').value
    const amount = this.Form.get('amount').value * Math.pow(10, Number(decimals));
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    try {
      const withdraw = await Pool_Proxy_Aave_Contract.methods.withdraw(this.selectedWithdrawReserve, amount.toString(), this.Form.get('withdrawTo').value).send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.withdraw(this.selectedWithdrawReserve, amount.toString(), this.Form.get('withdrawTo').value).encodeABI(),
        gas: 1000000
      })
      const receipt = await this.web3.eth.getTransactionReceipt(withdraw.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.selectedWithdrawReserve = '';
        Swal.fire({
          title: "Transaction Successful",
          icon: "success",
        })
        this.resetData();
        this.deposits = 0;
        this.borrows = 0;
        this.getUserReservesData();
        this.totalAvailable = 0;
        this.calculateMarksetSize();
        console.log('Transaction succeeded!');
      }
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.selectedWithdrawReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
    }
    this.showSpinner = false;
    this.Form.reset();
    this.selectedWithdrawReserve = '';
  }

  async borrowAsset() {
    this.showSpinner = true;
    this.address = localStorage.getItem('walletAddress')
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.selectedBorrowReserve);
    let decimals = await this.Addresscontract.methods.decimals().call();
    const name = await this.Addresscontract.methods.name().call();
    if (name == "BUSD Token") {
      decimals = 8n;
    }
    const amount = this.Form.get('amount').value * Math.pow(10, Number(decimals));
    let RadiantLendingPoolV2Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const interestRateMode = 2;
    const referralCode = 0;
    try {
      const result = await RadiantLendingPoolV2Contract.methods.borrow(this.selectedBorrowReserve, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).send({
        from: this.address,
        data: await RadiantLendingPoolV2Contract.methods.borrow(this.selectedBorrowReserve, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).encodeABI(),
        gas: 1000000
      });
      const receipt = await this.web3.eth.getTransactionReceipt(result.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.selectedBorrowReserve = '';
        Swal.fire({
          title: "Transaction Successfull",
          icon: "success",
        })
        this.resetData();
        this.deposits = 0;
        this.borrows = 0;
        this.getUserReservesData();
        this.totalAvailable = 0;
        this.calculateMarksetSize();
        console.log('Transaction succeeded!');
      }
      this.showSpinner = false;
      this.selectedBorrowReserve = '';
      console.log('Transaction hash:', result);
    } catch (error: any) {
      console.error('Error:', error);
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      this.showSpinner = false;
      this.selectedBorrowReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
      console.error('Error:', innerErr);
    }
    this.showSpinner = false;
    this.selectedBorrowReserve = '';
  }

  async repayAsset() {
    this.showSpinner = true;
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.selectedRepayReserve);
    const decimals = await this.Addresscontract.methods.decimals().call();
    const rateMode = 2;
    const amount = Number(this.Form.get('amount').value) * Math.pow(10, Number(decimals));
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    try {
      const Approve = await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).send({
        from: localStorage.getItem('walletAddress'),
        data: await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).encodeABI()
      });
      const receipt = await this.web3.eth.getTransactionReceipt(Approve.transactionHash);
      if (receipt && receipt.status) {
        Swal.fire({
          title: "Transaction Approve Successfull",
          icon: "success",
          timer: 1500
        });
        console.log('Transaction succeeded!');
      }
      console.log('Transaction hash:', Approve);
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.selectedRepayReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
      else {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.Form.reset();
      this.selectedRepayReserve = '';
      return;
    }

    try {
      const withdraw = await Pool_Proxy_Aave_Contract.methods.repay(this.selectedRepayReserve, amount.toString(), rateMode.toString(), this.address).send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.repay(this.selectedRepayReserve, amount.toString(), rateMode.toString(), this.address).encodeABI(),
        gas: 1000000
      })
      const receipt = await this.web3.eth.getTransactionReceipt(withdraw.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.selectedRepayReserve = '';
        Swal.fire({
          title: "Transaction Successful",
          icon: "success",
        })
        this.resetData();
        this.deposits = 0;
        this.borrows = 0;
        this.getUserReservesData();
        this.totalAvailable = 0;
        this.calculateMarksetSize();
        console.log('Transaction succeeded!');
      }
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', error);
      this.showSpinner = false;
      this.selectedRepayReserve = '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
    }
    this.showSpinner = false;
    this.Form.reset();
    this.selectedRepayReserve = '';
  }
}