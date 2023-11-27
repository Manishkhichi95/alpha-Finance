import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  walletAddress: any;
  borrows: Number = 0;
  deposits: Number = 0;
  ContractData: any = [];
  error: boolean = false;
  totalAvailable: any = 0;
  totalDepositArr: any = [];
  totalBorrowsArr: any = [];
  connected: boolean = false;
  showDetails: boolean = false;
  title = 'alpha-finance-launch';
  CurrentchainId: any = localStorage.getItem('chainId');
  networkName: string | null = localStorage.getItem('networkName');
  icons: string[] = ['assets/alphalogo.png']

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service, private router: Router) {
    this.walletAddress = localStorage.getItem('walletAddress');
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    this.networkName == null ? this.networkName = "Mumbai Testnet" : "";
    this.CurrentchainId == '0xa4b1' ? this.networkName = 'Arbitrum' : this.CurrentchainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Mumbai Testnet';
  }

  ngOnInit() {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    debugger
    this.networkName == 'Mumbai Testnet' ?
      (this.readContractsService.getReserveData().then((data: any) => {
        this.ContractData = data,
          this.readContractsService.data.next(this.ContractData)
        if (this.ContractData.length > 0) {
          this.totalDepositArr = [];
          this.totalBorrowsArr = [];
          this.ContractData.forEach((element: any) => {
            
            this.totalDepositArr.push(element.deposit);
            console.log('element', element)
            this.totalBorrowsArr.push(element.totalBorrows);
          });
          const sumOfDeposits = this.totalDepositArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
          this.deposits = sumOfDeposits;
          const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
          this.borrows = sumOfBorrows;
          this.totalAvailable = (Number(this.deposits) - Number(this.borrows)).toFixed(2);
          localStorage.setItem('borrows',JSON.stringify(this.borrows));
          localStorage.setItem('deposits',JSON.stringify(this.deposits));
          localStorage.setItem('totalAvailable',JSON.stringify(this.totalAvailable));

          this.readContractsService.borrows.next(this.borrows);
          this.readContractsService.deposits.next(this.deposits);
          this.readContractsService.totalAvailable.next(this.totalAvailable);
        }
      })) : this.ContractData = [];
  }

  setCurrentchainId(chainId: string) {
    localStorage.setItem('networkName', chainId);
    this.CurrentchainId = chainId;
    chainId == '0xa4b1' ? this.networkName = 'Arbitrum' : chainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Mumbai Testnet';
    this.networkName == 'Mumbai Testnet' && this.CurrentchainId == '0x13881' ?
      (this.readContractsService.getReserveData().
        then((data: any) => {
          this.ContractData = [];
          this.ContractData = data;
          if (this.ContractData.length > 0) {
            this.totalDepositArr = [];
            this.totalBorrowsArr = [];
            this.ContractData.forEach((element: any) => {
              console.log('element', element)
              this.totalDepositArr.push(element.deposit);
              this.totalBorrowsArr.push(element.totalBorrows);
            });
            
            const sumOfDeposits = this.totalDepositArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
            this.deposits = sumOfDeposits;
            const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
            this.borrows = sumOfBorrows;
            this.totalAvailable = (Number(this.deposits) - Number(this.borrows));
            this.readContractsService.deposits.next(this.deposits);
            this.readContractsService.borrows.next(this.borrows);
            this.readContractsService.totalAvailable.next(this.totalAvailable);
          }
        })) : this.ContractData = []
  }
  goToAsset(selectedAsset: any, img: string) {
    this.showDetails = true;
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    selectedAsset.icon = img;
    this.readContractsService.getSelectedReserve(selectedAsset);
    this.router.navigateByUrl('/details');
  }
}