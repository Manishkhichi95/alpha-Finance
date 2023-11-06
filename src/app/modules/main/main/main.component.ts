import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { readContractsService } from 'src/app/services/readContracts.service';
import { Web3Service } from 'src/app/services/WEb3Service.service';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'alpha-finance-launch';
  ContractData: any = [];
  walletAddress: any;
  connected: any;
  error: boolean = false;
  totalDepositArr: any = [];
  CurrentchainId: any = localStorage.getItem('chainId');
  networkName: string | null = localStorage.getItem('networkName');
  icons: string[] = ['assets/images/ic1.png', 'assets/images/ic3.png', 'assets/images/ic2.png', 'assets/images/ic4.png', 'assets/images/ic5.png', 'assets/images/ic6.png', 'assets/images/ic7.png']
  deposits: Number = 0;
  totalBorrowsArr: any = [];
  borrows: Number = 0;
  totalAvailable: any = 0;
  showDetails: boolean = false;

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service, private router: Router) {
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    this.walletAddress = localStorage.getItem('walletAddress');
    this.CurrentchainId == '0xa4b1' ? this.networkName = 'Arbitrum' : this.CurrentchainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Polygon Testnet';
    this.networkName == 'Arbitrum' ? this.readContractsService.getReserveData().then((data: any) => {
      this.ContractData = [];
      this.ContractData = data;
    }) : ''
  }

  ngOnInit() {
    this.readContractsService.getReserveData().then((data: any) => {
      this.ContractData = data;
      this.readContractsService.setData(this.ContractData);
      this.ContractData.forEach((element: any) => {
        this.totalDepositArr.push(element.deposit);
        this.totalBorrowsArr.push(element.totalBorrows);
      });
      const sumOfDeposits = this.totalDepositArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
      this.deposits = sumOfDeposits.toFixed(2);

      // // localStorage.setItem('deposits',JSON.stringify(this.deposits))
      const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
      this.borrows = sumOfBorrows.toFixed(2);

      // // localStorage.setItem('borrows',JSON.stringify(this.borrows))

      this.totalAvailable = (Number(this.deposits) - Number(this.borrows)).toFixed(2);
      
      // localStorage.setItem('totalAvailable',JSON.stringify(this.totalAvailable))

    });
  }

  setCurrentchainId(chainId: string) {
    this.CurrentchainId = chainId;
    chainId == '0xa4b1' ? this.networkName = 'Arbitrum' : chainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Polygon Testnet';
    this.networkName == 'Arbitrum' ? this.readContractsService.getReserveData().then((data: any) => {
      this.ContractData = [];
      this.ContractData = data;
    }) : ''
  };

  goToAsset(selectedAsset: any, img: string) {
    this.showDetails = true;
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    console.log(selectedAsset, img);
    selectedAsset.icon = img;
    this.readContractsService.getSelectedReserve(selectedAsset);
    this.router.navigateByUrl('/details');
  }
}