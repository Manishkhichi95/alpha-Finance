import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import { Router } from '@angular/router';

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

  constructor( private router: Router, private readContractsService: readContractsService, private Web3Service: Web3Service, private http: HttpClient) {
    this.web3 = this.Web3Service.getWeb3();
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    this.reserve = this.readContractsService.selectedReserve;
    this.showSelectedReserve = this.reserve.name;
    this.SelectedIcon = "../../../../" + this.reserve.icon;
  }

  ngOnInit(): void {
    this.initializeData();
    this.ContractData = this.readContractsService.getData();
  }

  async initializeData() {
    const data: any = await this.http.get('assets/json/ABIs&Addresses.json').toPromise();
    let aTokenContractABI = data.aTokenContractABI;
    this.aaveOracleAddress = data.aaveOracleAddress;
    let aaveOracleABI = data.aaveOracleABI;
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
          (Number(1 + '0'.repeat(Number(this.reserve.decimals))))).toFixed(2)

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

  goToMarket(){
    this.router.navigateByUrl('/market');
  }
}
