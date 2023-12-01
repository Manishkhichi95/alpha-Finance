import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit, AfterViewInit {
  web3: any;
  reserve: any;
  balance: any;
  address: any;
  assetPrice: any;
  reserveSize: any;
  OraclePrice: any;
  SelectedIcon: any;
  options: any = {
    chart: {
      backgroundColor: '#0E1330',
      color: 'white',
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 50
      }
    },
    title: {
      text: '',
      align: 'left'
    },
    xAxis: {
      min: 0,
      max: 100,
      tickInterval: 25,
      labels: {
        format: ' {value} %'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 50,
      gridLineDashStyle: 'longdash',
      title: {
        text: ''
      },
      labels: {
        format: ' {value} %'
      }
    },
    tooltip: {
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    series: [{
      name: '',
      data: [
        [5, 5.1],
        [10, 4.4],
        [15, 3.7],
        [20, 4.2]
      ]
    }],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  };
  Addresscontract: any;
  utilizationRate: any;
  supplyVal: any = '0.00';
  ContractData: any = [];
  aaveOracleAddress: any;
  tokenContractsABI: any;
  availableLiquidity: any;
  showSelectedReserve: any;
  borrowValue: any = '0.00';
  liquidationThreshold: any;
  RadiantLendingPoolV2ABI: any;
  showDetails: boolean = false;
  liquidationPenalty: Number = 0;
  RadiantLendingPoolV2Address: any;
  RadiantLendingPoolV2Contract: any;
  icons: string[] = ['assets/images/ic1.png', 'assets/images/ic3.png', 'assets/images/ic2.png', 'assets/images/ic4.png', 'assets/images/ic5.png', 'assets/images/ic6.png', 'assets/images/ic7.png'];
  previousUrl: any;
  constructor(private router: Router, private readContractsService: readContractsService, private Web3Service: Web3Service, private http: HttpClient, private location: Location) {
    this.web3 = this.Web3Service.getWeb3();
    this.reserve = this.readContractsService.selectedReserve;
    this.showSelectedReserve = this.reserve.name;
    this.SelectedIcon = "../../../../" + this.reserve.icon;
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
  }

  ngOnInit(): void {
    this.initializeData();
    Highcharts.chart('container', this.options);
    this.readContractsService.data.subscribe((res: any) => {
      this.ContractData = res;
    });
  }

  async initializeData() {
    this.address = localStorage.getItem('walletAddress');
    this.reserve.balance = (Number(this.reserve.balance) / 1000000000000000000).toFixed(2);
    const balance = await this.web3.eth.getBalance(this.address);
    this.balance = (Number(balance) / Math.pow(10, 18)).toFixed(3);
    console.log('blnce', this.balance)
    const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
    let aaveOracleABI = data.aaveOracleABI;
    let aTokenContractABI = data.aTokenContractABI;
    this.aaveOracleAddress = data.aaveOracleAddress;
    this.tokenContractsABI = data.tokenContractsABI;
    this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
    this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
    this.liquidationThreshold = Number(this.reserve['details'].reserveLiquidationThreshold) / 100;
    this.liquidationPenalty = (Number(this.reserve['details'].reserveLiquidationBonus) / 7) / 100;
    this.RadiantLendingPoolV2Contract = new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const leverager = await this.RadiantLendingPoolV2Contract.methods.leverager().call();
    const leveragerContract = new this.web3.eth.Contract([{ "inputs": [{ "internalType": "contract ILendingPool", "name": "_lendingPool", "type": "address" }, { "internalType": "contract IEligibilityDataProvider", "name": "_rewardEligibleDataProvider", "type": "address" }, { "internalType": "contract IAaveOracle", "name": "_aaveOracle", "type": "address" }, { "internalType": "contract ILockZap", "name": "_lockZap", "type": "address" }, { "internalType": "contract IChefIncentivesController", "name": "_cic", "type": "address" }, { "internalType": "contract IWETH", "name": "_weth", "type": "address" }, { "internalType": "uint256", "name": "_feePercent", "type": "uint256" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_feePercent", "type": "uint256" }], "name": "FeePercentUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_treasury", "type": "address" }], "name": "TreasuryUpdated", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "API_ETH_MOCK_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RATIO_DIVISOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aaveOracle", "outputs": [{ "internalType": "contract IAaveOracle", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cic", "outputs": [{ "internalType": "contract IChefIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eligibilityDataProvider", "outputs": [{ "internalType": "contract IEligibilityDataProvider", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feePercent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getConfiguration", "outputs": [{ "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }], "internalType": "struct DataTypes.ReserveConfigurationMap", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getVDebtToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lendingPool", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lockZap", "outputs": [{ "internalType": "contract ILockZap", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }, { "internalType": "bool", "name": "isBorrow", "type": "bool" }], "name": "loop", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }], "name": "loopETH", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "ltv", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_feePercent", "type": "uint256" }], "name": "setFeePercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_treasury", "type": "address" }], "name": "setTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "weth", "outputs": [{ "internalType": "contract IWETH", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "wethToZap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }], "name": "wethToZapEstimation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "borrower", "type": "address" }], "name": "zapWETHWithBorrow", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], leverager);
    this.reserve.maxLTV = Number(await leveragerContract.methods.ltv(this.reserve.address).call()) / 100;
    //Asset Price
    this.reserve.assetPrice.toString().length > 4 ?
      this.assetPrice = '$' + (this.reserve.assetPrice / 1000).toFixed(2) + 'K' :
      this.assetPrice = '$' + this.reserve.assetPrice;

    //availableLiquidity 
    const availableLiquidity = ((Number(this.reserve.details['availableLiquidity']) /
      (Number(1 + '0'.repeat(Number(this.reserve.decimals)))))).toFixed(0);
    availableLiquidity.toString().length >= 7 ?
      this.availableLiquidity = '$' + (Number(this.reserve.details['availableLiquidity']) /
        (Number(1 + '0'.repeat(Number(this.reserve.decimals)))) / 1000000).toFixed(2) + 'M' :
      availableLiquidity.toString().length == 5 ?
        this.availableLiquidity = '$' + (Number(this.reserve.details['availableLiquidity']) /
          (Number(1 + '0'.repeat(Number(this.reserve.decimals)))) / 1000).toFixed(2) + 'k' :
        this.availableLiquidity = '$' + (Number(this.reserve.details['availableLiquidity']) /
          (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(2);

    //reserveSize
    const aTokenContract = new this.web3.eth.Contract(aTokenContractABI, this.reserve.details['aTokenAddress']);
    const aTokenSupply = await aTokenContract.methods.totalSupply().call();
    const reserveSize = (Number(aTokenSupply) / (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(0);
    reserveSize.toString().length >= 7 ?
      this.reserveSize = '$' + (Number(aTokenSupply) / (Number(1 + '0'.repeat(Number(this.reserve.decimals)))) / 1000000).toFixed(2) + 'M' :
      reserveSize.toString().length == 5 || reserveSize.toString().length == 4 ?
        this.reserveSize = '$' + (Number(aTokenSupply) / (Number(1 + '0'.repeat(Number(this.reserve.decimals)))) / 1000).toFixed(2) + 'k' :
        this.reserveSize = '$' + (Number(aTokenSupply) / (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(2);
    //utilizationRate
    debugger
    console.log("reserveSize",reserveSize)
    if(reserveSize=="0"){
      this.utilizationRate = "0.00"
    }else{
      this.utilizationRate = ((((Number(availableLiquidity)) - (Number(reserveSize))) / (Number(reserveSize))) * 100).toFixed(2);
    }

    //OraclePrice
    const aaveOracleContract = new this.web3.eth.Contract(aaveOracleABI, this.aaveOracleAddress);
    const OraclePrice = await aaveOracleContract.methods.getAssetPrice(this.reserve.address).call();
    this.OraclePrice = ((Number(OraclePrice)) / (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(2);
  }

  ngAfterViewInit(): void {
    this.readContractsService.dropDown();
  }

  showSelected(assetName: string) {
    this.ContractData.forEach((item: any) => {
      item.name == assetName ? (console.log(item), this.reserve = item, this.initializeData()) : '';
    });
  }

  goBack() {
    this.location.back();
  }

  async supplyAmount() {
    this.Addresscontract = new this.web3.eth.Contract(this.tokenContractsABI, this.reserve.address);
    const amount = this.supplyVal * Math.pow(10, 18);
    const balance = await this.Addresscontract.methods.balanceOf(localStorage.getItem('walletAddress')).call();
    if (Number(balance) < Number(amount)) {
      throw new Error('Insufficient balance to perform the transaction.');
    }
    const Approve = await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).send({
      from: localStorage.getItem('walletAddress'),
      data: await this.Addresscontract.methods.approve("0x1198AeE495289FFBA2B3fc37A9dFB4CC5a48a287", amount.toString()).encodeABI()
    });
    console.log('Transaction hash:', Approve);
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const referralCode = 0;
    try {
      const deposit = await Pool_Proxy_Aave_Contract.methods.deposit(this.reserve.address, amount.toString(), this.address, referralCode.toString()).send({
        from: this.address,
        data: await Pool_Proxy_Aave_Contract.methods.deposit(this.reserve.address, amount.toString(), this.address, referralCode.toString()).encodeABI(),
        gas: 1000000
      });

      const receipt = await this.web3.eth.getTransactionReceipt(deposit.transactionHash);
      if (receipt && receipt.status) {
        console.log('Transaction succeeded!');
      }
      console.log('Transaction hash:', deposit);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async borrowAmount() {
    let RadiantLendingPoolV2Contract = await new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const amount = 1 * Math.pow(10, 14);
    const interestRateMode = 1;
    const referralCode = 0;
    try {
      const result = await RadiantLendingPoolV2Contract.methods.borrow(this.reserve.address, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).send({
        from: this.address,
        data: await RadiantLendingPoolV2Contract.methods.borrow(this.reserve.address, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.address).encodeABI(),
        gas: 10000000
      });
      console.log('Transaction hash:', result);
    } catch (error) {
      console.error('Errorasdfbhsd:', error);
    }
  }
}