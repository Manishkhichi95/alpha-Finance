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
  web3: any;
  borrows: any = 0;
  deposits: any = 0;
  walletAddress: any;
  ContractData: any = [];
  error: boolean = false;
  totalAvailable: any = 0;
  connected: boolean = false;
  showDetails: boolean = false;
  totalDepositArr: number[] = [];
  totalBorrowsArr: number[] = [];
  title = 'alpha-finance-launch';
  CurrentchainId: any = localStorage.getItem('chainId');
  networkName: string | null = localStorage.getItem('networkName');
  icons: string[] = ["assets/alphalogo.png", "assets/images/busd-c4257f9b.svg", "assets/images/ic3.png"];

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service, private router: Router) {
    this.walletAddress = localStorage.getItem('walletAddress');
    localStorage.setItem('showAssetDetails', JSON.stringify(this.showDetails));
    this.checkNetworkId();
  }

  async checkNetworkId() {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    this.networkName == null ? this.networkName = 'Select Network' : '';
    this.web3 = this.web3Service.getWeb3();
    const CurrentchainId = await this.web3.eth.net.getId();
    console.log(CurrentchainId)
    if (CurrentchainId == 80001n) {
      this.networkName = 'Mumbai Testnet';
        this.readContractsService.getReserveData().then((data: any) => {
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
            this.deposits = sumOfDeposits.toFixed(0);
            const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
            this.borrows = sumOfBorrows.toFixed(0);
            this.totalAvailable = (Number(this.deposits) - Number(this.borrows)).toFixed(0);
            localStorage.setItem('borrows', JSON.stringify(this.borrows));
            localStorage.setItem('deposits', JSON.stringify(this.deposits));
            localStorage.setItem('totalAvailable', JSON.stringify(this.totalAvailable));

            data.forEach((item: any) => {

              console.log('asdf', item.totalSupply, item.totalBorrows)
              const ttlSpply = Math.floor(item.totalSupply);
              if (ttlSpply.toString().length == 1 || ttlSpply.toString().length == 2) {
                item.totalSupply = ttlSpply;
              }
              if (ttlSpply.toString().length == 3 || ttlSpply.toString().length == 4 || ttlSpply.toString().length == 5) {
                item.totalSupply = (ttlSpply / 1000).toFixed(2) + 'k';
              }
              if (ttlSpply.toString().length == 6 || ttlSpply.toString().length == 7 || ttlSpply.toString().length == 8) {
                item.totalSupply = (ttlSpply / 1000000).toFixed(2) + 'M';
              }
              if (ttlSpply.toString().length > 9) {
                item.totalSupply = (ttlSpply / 1000000000).toFixed(2) + 'B';
              }
              console.log('asdf', item.totalSupply, item.totalBorrows)
              const ttlBrrw = Math.floor(item.totalBorrows);
              if (ttlBrrw.toString().length == 1 || ttlBrrw.toString().length == 2 || ttlBrrw.toString().length == 3) {
                item.totalBorrows = ttlBrrw;
              }
              if (ttlBrrw.toString().length == 4 || ttlBrrw.toString().length == 5 || ttlBrrw.toString().length == 6) {
                item.totalBorrows = (ttlBrrw / 1000).toFixed(2) + 'k';
              }
              if (ttlBrrw.toString().length == 7 || ttlBrrw.toString().length == 8) {
                item.totalBorrows = (ttlBrrw / 1000000).toFixed(2) + 'M';
              }
              if (ttlBrrw.toString().length > 9) {
                item.totalBorrows = (ttlBrrw / 1000000000).toFixed(2) + 'B';
              }
            })

            this.readContractsService.borrows.next(this.borrows);
            this.readContractsService.deposits.next(this.deposits);
            this.readContractsService.totalAvailable.next(this.totalAvailable);
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
          }

        })
    }
      else if (!this.connected) {
        this.ContractData = [];
      }
    if (CurrentchainId == 42161n) {
      this.networkName = 'Arbitrum';
      this.ContractData = [];
    }
    if (CurrentchainId == 137n) {
      this.networkName = 'Polygon Mainnet';
      this.ContractData = [];
    }
    else if (CurrentchainId != 42161n && CurrentchainId != 137n && CurrentchainId != 80001n) {
      this.networkName = 'Select Network';
      this.ContractData = [];
    }
  }
  
  ngOnInit() {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
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
          if (this.connected) {
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
            }
          }
          if (!this.connected) {
            this.ContractData = [];
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