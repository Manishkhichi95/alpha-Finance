import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent {
  web3: any;
  Form: any;
  amount: any;
  balance: any;
  chainId = '';
  alphaAdd: any;
  alphaOFTABI: any;
  fees: any = '0.0';
  balanceAsset: any;
  walletAddress: any;
  symbol: string = '';
  CurrentchainId: any;
  transactionType: any;
  tokenContractsABI: any;
  connected: boolean = false;
  localContractInstance: any;
  showError: boolean = false;
  UiPoolDataProviderV2V3: any;
  showSpinner: boolean = false;
  networkName: any = 'Select Network';
  CHAIN_ID: any = require("../../../assets/json/chainIds.json");

  constructor(private getWeb3: Web3Service, private cdr: ChangeDetectorRef,
    private http: HttpClient, private readContractsService: readContractsService, private fb: FormBuilder) {
    this.web3 = this.getWeb3.getWeb3();
  }

  getNetworkSymbol(chainId: bigint) {
    chainId == 1n ? this.symbol = 'ETH Mainnet' : chainId == 5n ? this.symbol = 'GoerliETH' :
      chainId == 80001n ? this.symbol = 'MATIC' : chainId == 42161n ? this.symbol = 'Arbitrum' :
        chainId == 137n ? this.symbol = 'MATIC' : this.symbol = '';
  }

  ngOnInit() {
    window.ethereum.on('networkChanged', async (networkId: any) => {
      this.getNetworkSymbol(BigInt(networkId));
      this.getWeb3.walletAddress.subscribe(async (address: string) => {
        this.walletAddress = address;
        const balance = await this.web3.eth.getBalance(this.walletAddress);
        this.balance = (Number(balance) / Math.pow(10, 18)).toFixed(2);
        this.cdr.detectChanges();
      });
    });
    this.UiPoolDataProviderV2V3 = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract IChainlinkAggregator", "name": "_networkBaseTokenPriceInUsdProxyAggregator", "type": "address" }, { "internalType": "contract IChainlinkAggregator", "name": "_marketReferenceCurrencyPriceInUsdProxyAggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ETH_CURRENCY_UNIT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MKRAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_bytes32", "type": "bytes32" }], "name": "bytes32ToString", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "baseLTVasCollateral", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "reserveLiquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }, { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" }, { "internalType": "uint128", "name": "liquidityRate", "type": "uint128" }, { "internalType": "uint128", "name": "variableBorrowRate", "type": "uint128" }, { "internalType": "uint128", "name": "stableBorrowRate", "type": "uint128" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }, { "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" }, { "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalPrincipalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableDebtLastUpdateTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalScaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "priceInMarketReferenceCurrency", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "variableRateSlope2", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope1", "type": "uint256" }, { "internalType": "uint256", "name": "stableRateSlope2", "type": "uint256" }, { "internalType": "bool", "name": "isPaused", "type": "bool" }, { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" }, { "internalType": "uint128", "name": "unbacked", "type": "uint128" }, { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }, { "internalType": "uint256", "name": "debtCeiling", "type": "uint256" }, { "internalType": "uint256", "name": "debtCeilingDecimals", "type": "uint256" }, { "internalType": "uint8", "name": "eModeCategoryId", "type": "uint8" }, { "internalType": "uint256", "name": "borrowCap", "type": "uint256" }, { "internalType": "uint256", "name": "supplyCap", "type": "uint256" }, { "internalType": "uint16", "name": "eModeLtv", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationThreshold", "type": "uint16" }, { "internalType": "uint16", "name": "eModeLiquidationBonus", "type": "uint16" }, { "internalType": "address", "name": "eModePriceSource", "type": "address" }, { "internalType": "string", "name": "eModeLabel", "type": "string" }, { "internalType": "bool", "name": "borrowableInIsolation", "type": "bool" }], "internalType": "struct IUiPoolDataProviderV3.AggregatedReserveData[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "marketReferenceCurrencyUnit", "type": "uint256" }, { "internalType": "int256", "name": "marketReferenceCurrencyPriceInUsd", "type": "int256" }, { "internalType": "int256", "name": "networkBaseTokenPriceInUsd", "type": "int256" }, { "internalType": "uint8", "name": "networkBaseTokenPriceDecimals", "type": "uint8" }], "internalType": "struct IUiPoolDataProviderV3.BaseCurrencyInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }], "name": "getReservesList", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReservesData", "outputs": [{ "components": [{ "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "uint256", "name": "scaledATokenBalance", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabledOnUser", "type": "bool" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowLastUpdateTimestamp", "type": "uint256" }], "internalType": "struct IUiPoolDataProviderV3.UserReserveData[]", "name": "", "type": "tuple[]" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketReferenceCurrencyPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "networkBaseTokenPriceInUsdProxyAggregator", "outputs": [{ "internalType": "contract IChainlinkAggregator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }], '0x7BaBAC953cc866A50a1Fc9fA57ba77223B33a156');
    this.getWeb3.walletAddress.subscribe(async (address: string) => {
      this.walletAddress = address
      const balance = await this.web3.eth.getBalance(this.walletAddress);
      this.balance = (Number(balance) / Math.pow(10, 18)).toFixed(2);
      this.cdr.detectChanges();
    });
    this.getWeb3.connected.subscribe(async (connect: boolean) => {
      this.connected = connect;
      const currentChainId = await this.web3.eth.net.getId();
      this.getNetworkSymbol(currentChainId);
    })
    this.Form = this.fb.group({
      DstAddress: ['', Validators.required]
    })
    const data: any = require('../../../assets/json/ABIs&Addresses.json');
    this.alphaAdd = data.alphaOFTAdd;
    this.alphaOFTABI = data.alphaOFTABI;
    this.localContractInstance = new this.web3.eth.Contract(this.alphaOFTABI, this.alphaAdd);
  }

  ngAfterViewInit(): void {
    this.readContractsService.dropDown();
  }

  isInvalid(controlName: string): any {
    const control = this.Form.get(controlName);
    return control?.touched && control?.invalid;
  }

  openDialog() {
    if (this.chainId == '' && this.amount == undefined) {
      Swal.fire({
        title: "Please Fill the Required Fields.",
        icon: "warning"
      })
      return
    }
    else if (this.chainId == '') {
      Swal.fire({
        title: "Please Select the Destination Network.",
        icon: "warning"
      })
      return
    }
    else if (this.amount == undefined) {
      Swal.fire({
        title: "Please Enter the Amount to Send.",
        icon: "warning"
      })
      return
    }
    else if (this.chainId != '' && this.amount != undefined) {
      const element: any = document.getElementById("myModal");
      element.style.display = "block";
    }
  }

  closeDialog() {
    const element: any = document.getElementById("myModal");
    element.style.display = "none";
  }

  async switchNetwork(network: string) {
    network == 'Arbitrum' ? this.chainId = this.CHAIN_ID["goerli"] : network == 'Polygon Mainnet' ? this.chainId = '0x89' : network == 'Mumbai Testnet' ? this.chainId = '0x13881' : network == 'Select Network' ? this.chainId = '' : '';
    this.networkName = network;
    const address = this.walletAddress.slice(2);
    const fees = await this.localContractInstance.methods.estimateSendFee(this.chainId, '0x000000000000000000000000' + address, this.amount, false, [])
      .call();
    this.fees = fees[0];
  }

  async sendFrom() {
    const element: any = document.getElementById("myModal");
    element.style.display = "none";
    const address = '0x000000000000000000000000' + ((this.Form.get('DstAddress')?.value).slice(2));
    const amount = ((Number(this.amount)) * Math.pow(10, 18));
    const fees = Number(this.fees) / Math.pow(10, 18);
    if (this.Form.get('DstAddress')?.value == '') {
      this.showError = true;
      return
    }
    this.showSpinner = true;
    try {
      let sendFrom = await this.localContractInstance.methods.sendFrom(
        this.walletAddress,
        this.chainId,
        address,
        amount,
        [this.walletAddress,
          '0x0000000000000000000000000000000000000000',
          '0x00010000000000000000000000000000000000000000000000000000000000030d40']
      ).send({
        from: this.walletAddress,
        value: this.fees,
        data: this.localContractInstance.methods.sendFrom(
          this.walletAddress,
          this.chainId,
          address,
          amount,
          [this.walletAddress,
            '0x0000000000000000000000000000000000000000',
            '0x00010000000000000000000000000000000000000000000000000000000000030d40']
        ).encodeABI(),
        gas: 1000000
      })
      const receipt = await this.web3.eth.getTransactionReceipt(sendFrom.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.Form.reset();
        this.amount == '';
        Swal.fire({
          title: "Transaction Successful",
          icon: "success",
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.Form.reset();
            this.amount == '';
          }
        });
        console.log('Transaction succeeded!');
      }
    } catch (error: any) {
      console.log(error)
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.Form.reset();
      this.amount == '';
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
            text: innerErr.message,
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
    }
    this.showSpinner = false;
    this.Form.reset();
    this.amount == '';
    this.Form.reset();
  }

  async getMaxAlpha() {
    const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
    this.tokenContractsABI = data.tokenContractsABI;
    const depositedAssetContract = await this.UiPoolDataProviderV2V3.methods.getUserReservesData(
      '0x5743f572A55CbB84c035903D0e888583CdD508c3', this.walletAddress).call();
    depositedAssetContract[0].forEach(async (res: any) => {
      const tokenContracts = new this.web3.eth.Contract(this.tokenContractsABI, res.underlyingAsset);
      if (res.scaledATokenBalance != 0) {
        const name = await tokenContracts.methods.name().call();
        if (name == 'Alpha') {
          const balanceAsset = await tokenContracts.methods.balanceOf(this.walletAddress).call();
          this.balanceAsset = (Number(balanceAsset) / Math.pow(10, 18)).toFixed(0);
          this.amount = this.balanceAsset;
        }
      }
    })
  }
}