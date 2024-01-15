import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit{
  networkName: string | null = localStorage.getItem('networkName');
  web3: any;
  ContractData: any;
  totalDepositArr: any = [];
  totalBorrowsArr: any = [];
  deposits: any;
  borrows: any;
  totalAvailable: any = 0;
  walletAddress: any ='';
  connected: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private readContractsService: readContractsService,
    private web3Service: Web3Service, private router: Router) { }

    ngOnInit() {
      debugger
      this.walletAddress = localStorage.getItem('walletAddress');
      this.web3Service.connected.subscribe((res: any) => {
        this.connected = res;
        this.cdr.detectChanges();
      });
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts[0].toLowerCase() !== this.walletAddress.toLowerCase() && this.connected) {
          this.connected = true;
          this.web3Service.connected.next(this.connected);
          this.cdr.detectChanges();
        }
      })
      this.checkNetworkId();
      this.cdr.detectChanges();
      this.web3Service.walletAddress.subscribe((address: string) => {
        this.walletAddress = address;
        this.cdr.detectChanges();
      });
      this.web3Service.connected.subscribe((connected: boolean) => {
        this.connected = connected;
        this.cdr.detectChanges();
      })
      this.cdr.detectChanges();
    }
  
  async checkNetworkId() {
    this.networkName == null ? this.networkName = 'Select Network' : '';
    this.web3 = this.web3Service.getWeb3();
    const CurrentchainId = await this.web3.eth.net.getId();
    if (CurrentchainId == 80001n) {
      this.networkName = 'Mumbai Testnet';
      this.readContractsService.getReserveData().then((data: any) => {
        console.log(data, "data", "data")
        this.ContractData = data;
        if (this.ContractData.length > 0) {
          this.totalDepositArr = [];
          this.totalBorrowsArr = [];
          this.ContractData.forEach((element: any) => {
            this.totalDepositArr.push(element.deposit);
            this.totalBorrowsArr.push(element.totalBorrows);
          });
          const sumOfDeposits = this.totalDepositArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
          this.deposits = sumOfDeposits.toFixed(0);
          const sumOfBorrows = this.totalBorrowsArr.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
          this.borrows = sumOfBorrows.toFixed(0);
          this.totalAvailable = (Number(this.deposits) - Number(this.borrows)).toFixed(0);
          this.readContractsService.deposits.next(this.deposits);
          this.readContractsService.borrows.next(this.borrows);
          this.readContractsService.totalAvailable.next(this.totalAvailable);    
        }
      })
    }
  }
}