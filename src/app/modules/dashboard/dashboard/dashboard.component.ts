import Swal from 'sweetalert2';
import { ResponseError } from 'web3';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  web3: any;
  Form: any;
  reserve: any;
  address: any;
  accounts: any;
  balanceAsset: any;
  selectedReserve: any;
  transactionType: any;
  Addresscontract: any;
  tokenContractsABI: any;
  borrowContractData: any;
  borrowedAsset: any = [];
  SupplyContractData: any;
  depositedAsset: any = [];
  showError: boolean = false;
  connected: boolean = false;
  UiPoolDataProviderV2V3: any;
  showDetails: boolean = false;
  showSpinner: boolean = false;
  RadiantLendingPoolV2ABI: any;
  RadiantLendingPoolV2Address: any;
  selectedSupplyReserve: string = '';
  selectedBorrowReserve: string = '';
  selectedWithdrawReserve: string = '';
  CurrentchainId: any = localStorage.getItem('chainId');
  networkName: string | null = localStorage.getItem('networkName');
  icons: string[] = ["assets/alphalogo.png", "assets/images/busd-c4257f9b.svg", "assets/images/ic3.png"]
  constructor(private fb: FormBuilder, private web3Service: Web3Service, private http: HttpClient, private readContractsService: readContractsService, private router: Router) {
    this.Form = this.fb.group({
      amount: [null, Validators.required],
      withdrawTo: ['', Validators.required]
    });
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    });
    this.networkName == null ? this.networkName = 'Mumbai Testnet' : '';
    this.web3 = this.web3Service.getWeb3();
    this.getUserReservesData();
  }
  async getUserReservesData() {
    if (this.networkName == 'Mumbai Testnet') {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise()
      this.tokenContractsABI = data.tokenContractsABI;
      this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
      this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
      (this.readContractsService.getReserveData().then((data: any) => {
        this.borrowContractData = data;
        this.SupplyContractData = data;
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
      }))

      this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
      const depositedAssetContract = await this.UiPoolDataProviderV2V3.methods.getUserReservesData('0x5743f572A55CbB84c035903D0e888583CdD508c3', localStorage.getItem('walletAddress')).call();

      depositedAssetContract[0].forEach(async (res: any) => {
        const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, res.underlyingAsset);
        const balanceAsset = tokenContracts.methods.balanceOf(this.accounts[0]).call();
        balanceAsset.then((res: any) => {
          this.balanceAsset = (Number(res) / 1000000000000000000).toFixed(2);
        })
        if (res.scaledATokenBalance != 0) {
          const decimals = await tokenContracts.methods.decimals().call();
          const name = await tokenContracts.methods.name().call();
          const totalSupply = await tokenContracts.methods.totalSupply().call();
          const balance = (Number(res.scaledATokenBalance) / Math.pow(10, Number(decimals))).toFixed(2);
          this.depositedAsset.push({
            address: res.underlyingAsset,
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
          this.SupplyContractData = [];
          this.borrowContractData = [];
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
        this.SupplyContractData = data;
        this.borrowContractData = data;
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
            address: res.underlyingAsset,
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
    console.log(this.transactionType)
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

  async submitt() {
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
      this.showSpinner = true;
      this.address = localStorage.getItem('walletAddress');
      this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.selectedSupplyReserve);
      const decimals = await this.Addresscontract.methods.decimals().call();
      const amount = this.Form.get('amount').value * Math.pow(10, Number(decimals));
      this.Form.reset();
      const balance = await this.Addresscontract.methods.balanceOf(localStorage.getItem('walletAddress')).call();
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
        this.showSpinner = false;
        this.selectedSupplyReserve = '';
        Swal.fire({
          title: "Error:",
          text: error,
          icon: "warning",
        });
        console.log('error', error.splice(': Web3 validator found 1 error[s]:'))
        return;
      }
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
          }).then((result) => {
            if (result.isConfirmed) {
              this.SupplyContractData = [];
              this.borrowContractData = [];
              this.depositedAsset = [];
              this.getUserReservesData();
            }
          });
          console.log('Transaction succeeded!');
        }
        this.showSpinner = false;
        this.selectedSupplyReserve = '';
        console.log('Transaction hash:', deposit);
      } catch (error: any) {
        Swal.fire({
          title: "Error:",
          text: error,
          icon: "warning",
        });
        this.showSpinner = false;
        this.selectedSupplyReserve = '';
        console.error('Error:', error);
      }
      this.showSpinner = false;
      this.selectedSupplyReserve = '';
    }

    if (this.transactionType == 'Withdraw') {
      this.showSpinner = true;
      this.address = localStorage.getItem('walletAddress');
      const amount = this.Form.get('amount').value * Math.pow(10, 18);
      let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
      try {
        const withdraw = await Pool_Proxy_Aave_Contract.methods.withdraw(this.selectedWithdrawReserve, amount.toString(), this.Form.get('withdrawTo').value).send({
          from: this.address,
          data: await Pool_Proxy_Aave_Contract.methods.withdraw(this.selectedWithdrawReserve, amount.toString(), this.Form.get('withdrawTo').value).encodeABI(),
          gas: 1000000
        })
              this.showSpinner = false;
              const receipt = await this.web3.eth.getTransactionReceipt(withdraw.transactionHash);
              if (receipt && receipt.status) {
                this.showSpinner = false;
                this.selectedWithdrawReserve = '';
                Swal.fire({
                  title: "Transaction Successfull",
                  icon: "success",
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.SupplyContractData = [];
                    this.borrowContractData = [];
                    this.depositedAsset = [];
                    this.getUserReservesData();
                  }
                });
                console.log('Transaction succeeded!');
              }
              this.showSpinner = false;
              this.selectedWithdrawReserve = '';
              console.log('Transaction hash:', withdraw);
            } catch (error: any) {
              this.showSpinner = false;
              this.selectedWithdrawReserve = '';
              Swal.fire({
                title: "Error:",
                text: error,
                icon: "warning",
              });
              console.error('Error:', error);
            }
            this.showSpinner = false;
            this.selectedWithdrawReserve = '';
          }
    //       .then((tx: any) => {
    //         this.web3.waitForTransaction(tx.hash)
    //           .then(() => {
    //             this.showSpinner = false;
    //             this.selectedWithdrawReserve = '';
    //             Swal.fire({
    //               title: "Transaction Successfull",
    //               icon: "success",
    //             }).then((result) => {
    //               if (result.isConfirmed) {
    //                 this.SupplyContractData = [];
    //                 this.borrowContractData = [];
    //                 this.depositedAsset = [];
    //                 this.getUserReservesData();
    //               }
    //             });
    //             console.log("success");
    //             console.log(tx.hash);
    //           })
    //       })
    //       .catch((error: any) => {
    //         this.showSpinner = false;
    //         this.selectedWithdrawReserve = '';
    //         Swal.fire({
    //           title: "Error:",
    //           text: error.message,
    //           icon: "warning",
    //         });
    //         console.log('message', error.message);
    //       })
    //   } catch (error: any) {
    //     console.log(error)
    //   }
    // }

    if (this.transactionType == 'Borrow') {
      this.showSpinner = true;
      this.address = localStorage.getItem('walletAddress');
      let RadiantLendingPoolV2Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
      const amount = this.Form.get('amount').value * Math.pow(10, 6);
      const interestRateMode = 1;
      const referralCode = 0;
      try {
        const result = await RadiantLendingPoolV2Contract.methods.borrow(this.selectedBorrowReserve, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).send({
          from: this.address,
          data: await RadiantLendingPoolV2Contract.methods.borrow(this.selectedBorrowReserve, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).encodeABI(),
          gas: 100000000
        });
        const receipt = await this.web3.eth.getTransactionReceipt(result.transactionHash);
        if (receipt && receipt.status) {
          this.showSpinner = false;
          this.selectedBorrowReserve = '';
          Swal.fire({
            title: "Transaction Successfull",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              this.SupplyContractData = [];
              this.borrowContractData = [];
              this.depositedAsset = [];
              this.getUserReservesData();
            }
          });
          console.log('Transaction succeeded!');
        }
        this.showSpinner = false;
        this.selectedBorrowReserve = '';
        console.log('Transaction hash:', result);
      } catch (error: any) {
        this.showSpinner = false;
        this.selectedBorrowReserve = '';
        Swal.fire({
          title: "Error:",
          text: error,
          icon: "warning",
        });
        console.error('Error:', error);
      }
      this.showSpinner = false;
      this.selectedBorrowReserve = '';
    }
    this.Form.reset();
    this.showSpinner = false;
  }
}