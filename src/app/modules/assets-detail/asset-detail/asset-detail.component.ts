import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
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
  showDetails: boolean = false;
  availableLiquidity: any;
  assetPrice: any;
  showSelectedReserve: any;
  ContractData: any = [];
  icons: string[] = ['assets/images/ic1.png', 'assets/images/ic3.png', 'assets/images/ic2.png', 'assets/images/ic4.png', 'assets/images/ic5.png', 'assets/images/ic6.png', 'assets/images/ic7.png'];
  SelectedIcon: any;
  reserveSize: any;
  utilizationRate: any;
  OraclePrice: any;
  aaveOracleAddress: any;
  options: any = {
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1
      }
    },
    title: {
      text: '',
      align: 'left'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [{
        from: 0.3,
        to: 1.5,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          style: {
            color: '#606060'
          }
        }
      }, {
        from: 1.5,
        to: 3.3,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          style: {
            color: '#606060'
          }
        }
      }, {
        from: 3.3,
        to: 5.5,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          style: {
            color: '#606060'
          }
        }
      }, {
        from: 5.5,
        to: 8,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          style: {
            color: '#606060'
          }
        }
      }, {
        from: 8,
        to: 11,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          style: {
            color: '#606060'
          }
        }
      },]
    },
    tooltip: {
      valueSuffix: ''
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
        pointInterval: 3600000,
        pointStart: Date.UTC(2022, 5, 13, 0, 0, 0)
      }
    },
    series: [{
      name: '',
      data: [
        4.5, 5.1, 4.4, 3.7, 4.2, 3.7, 4.3, 4, 5, 4.9,
        4.8, 4.6, 3.9, 3.8, 2.7, 3.1, 2.6, 3.3, 3.8,
        4.1, 1, 1.9, 3.2, 3.8, 4.2]

    },],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  };
  Pool_Proxy_Aave_ABI: any;
  Pool_Proxy_Aave_Address: any;
  borrowValue: number = 0;
  RadiantLendingPoolV2Address: any;
  RadiantLendingPoolV2ABI: any;
  RadiantLendingPoolV2Contract: any;
  liquidationThreshold: any;
  constructor(private router: Router, private readContractsService: readContractsService, private Web3Service: Web3Service, private http: HttpClient) {
    this.web3 = this.Web3Service.getWeb3();
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    this.reserve = this.readContractsService.selectedReserve;
    this.showSelectedReserve = this.reserve.name;
    this.SelectedIcon = "../../../../" + this.reserve.icon;
  }

  ngOnInit(): void {
    this.initializeData();
    Highcharts.chart('container', this.options);
    this.readContractsService.data.subscribe((res: any) => {
      this.ContractData = res;
    });
  }

  async initializeData() {
    const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
    this.RadiantLendingPoolV2Address = data.RadiantLendingPoolV2Address;
    this.RadiantLendingPoolV2ABI = data.RadiantLendingPoolV2ABI;
    this.Pool_Proxy_Aave_ABI = data.Pool_Proxy_Aave_ABI;
    this.Pool_Proxy_Aave_Address = data.Pool_Proxy_Aave_Address;
    let aTokenContractABI = data.aTokenContractABI;
    this.aaveOracleAddress = data.aaveOracleAddress;
    let aaveOracleABI = data.aaveOracleABI;
    this.liquidationThreshold = Number(this.reserve['details'].reserveLiquidationThreshold) / 100,
      this.RadiantLendingPoolV2Contract = new this.web3.eth.Contract(this.RadiantLendingPoolV2ABI, this.RadiantLendingPoolV2Address);
    const leverager = await this.RadiantLendingPoolV2Contract.methods.leverager().call();
    const leveragerContract = new this.web3.eth.Contract([{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "AddressZero", "type": "error" }, { "inputs": [], "name": "ETHTransferFailed", "type": "error" }, { "inputs": [], "name": "EthTransferFailed", "type": "error" }, { "inputs": [], "name": "FallbackNotAllowed", "type": "error" }, { "inputs": [], "name": "InsufficientPermission", "type": "error" }, { "inputs": [], "name": "InvalidLoopCount", "type": "error" }, { "inputs": [], "name": "InvalidRatio", "type": "error" }, { "inputs": [], "name": "MarginTooHigh", "type": "error" }, { "inputs": [], "name": "ReceiveNotAllowed", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_feePercent", "type": "uint256" }], "name": "FeePercentUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_treasury", "type": "address" }], "name": "TreasuryUpdated", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "API_ETH_MOCK_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "INTEREST_RATE_MODE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_MARGIN", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_REASONABLE_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RATIO_DIVISOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "TWO_POW_16", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ZAP_MARGIN_ESTIMATION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aaveOracle", "outputs": [{ "internalType": "contract IAaveOracle", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cic", "outputs": [{ "internalType": "contract IChefIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eligibilityDataProvider", "outputs": [{ "internalType": "contract IEligibilityDataProvider", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feePercent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getConfiguration", "outputs": [{ "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }], "internalType": "struct DataTypes.ReserveConfigurationMap", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getVDebtToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPool", "name": "_lendingPool", "type": "address" }, { "internalType": "contract IEligibilityDataProvider", "name": "_rewardEligibleDataProvider", "type": "address" }, { "internalType": "contract IAaveOracle", "name": "_aaveOracle", "type": "address" }, { "internalType": "contract ILockZap", "name": "_lockZap", "type": "address" }, { "internalType": "contract IChefIncentivesController", "name": "_cic", "type": "address" }, { "internalType": "contract IWETH", "name": "_weth", "type": "address" }, { "internalType": "uint256", "name": "_feePercent", "type": "uint256" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lendingPool", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lockZap", "outputs": [{ "internalType": "contract ILockZap", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }, { "internalType": "bool", "name": "isBorrow", "type": "bool" }], "name": "loop", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }], "name": "loopETH", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }], "name": "loopETHFromBorrow", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "ltv", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IChefIncentivesController", "name": "_cic", "type": "address" }], "name": "setChefIncentivesController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_feePercent", "type": "uint256" }], "name": "setFeePercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_treasury", "type": "address" }], "name": "setTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "weth", "outputs": [{ "internalType": "contract IWETH", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "wethToZap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatio", "type": "uint256" }, { "internalType": "uint256", "name": "loopCount", "type": "uint256" }], "name": "wethToZapEstimation", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "borrower", "type": "address" }], "name": "zapWETHWithBorrow", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], leverager)
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
        this.reserveSize = '$' + (Number(aTokenSupply) / (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(2)

    //utilizationRate
    this.utilizationRate = ((((Number(reserveSize)) - (Number(availableLiquidity))) / (Number(reserveSize))) * 100).toFixed(2);

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
    })
  }

  goToMarket() {
    this.router.navigateByUrl('/market');
  }

  async supplyAmount() {
    let Pool_Proxy_Aave_Contract = await new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
    const amount = this.borrowValue * Math.pow(10, 14);
    const referralCode = 0;
    const gas = await Pool_Proxy_Aave_Contract.methods.supply(this.reserve.address, amount.toString(), localStorage.getItem('walletAddress'), referralCode).estimateGas({ from: localStorage.getItem('walletAddress') });
    try {
      const balance = await this.web3.eth.getBalance(localStorage.getItem('walletAddress'));
      const result = await Pool_Proxy_Aave_Contract.methods.supply(this.reserve.address, amount.toString(), localStorage.getItem('walletAddress'), referralCode).send({
        from: localStorage.getItem('walletAddress'),
        data: await Pool_Proxy_Aave_Contract.methods.supply(this.reserve.address, amount.toString(), localStorage.getItem('walletAddress'), referralCode).encodeABI(),
        gas: gas
      });
      console.log('Transaction hash:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}