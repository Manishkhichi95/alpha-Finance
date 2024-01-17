import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
// import { ethers } from 'ethers';
import { EtherscanProvider } from 'ethers';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  networkName: string | null = localStorage.getItem('networkName');
  web3: any;
  borrows: any;
  deposits: any;
  connected: any;
  ContractData: any;
  totalAvailable: any = 0;
  walletAddress: any = '';
  totalDepositArr: any = [];
  totalBorrowsArr: any = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private readContractsService: readContractsService,
    private web3Service: Web3Service, private router: Router) { }

  ngOnInit() {
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
    // let etherscanProvider = new ethers?.providers.EtherscanProvider();

    // etherscanProvider.getHistory(this.walletAddress).then((history: any) => {
    //   history.forEach((tx: any) => {
    //     console.log(tx);
    //   })
    //  });
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
    // if (!this.web3.utils.isAddress(this.walletAddress)) {
    //   console.error('Invalid Ethereum address');
    // }
    // const latestBlock = await this.web3.eth.getBlockNumber();
    // console.log(latestBlock)
    // this.web3.eth.getPastLogs({
    //   fromBlock: 44800806n,
    //   toBlock: latestBlock,
    //   address: this.walletAddress.toLowerCase()
    // })
    //   .then((res: any) => {
    //     res.forEach((rec: any) => {
    //       console.log("walletAddress", rec.blockNumber, rec.transactionHash, rec.topics);
    //     });
    //   }).catch((err: any) => console.log("getPastLogs failed", err));
    // (this.walletAddress).then((history: any) => {
    //   history.forEach((tx: any) => {
    //     console.log("getLogs",tx);
    //   })
    // });
    // }
    // this.web3.getTransactionCount(this.walletAddress, 'latest', (error: any, count: number) => {
    //   if (error) {
    //     console.error('Error fetching transaction count:', error);
    //     return;
    //   }
    //   const transactions: any = [];
    //   for (let i = 0; i < count; i++) {
    //     this.web3.eth.getTransactionFromBlock('latest', i, (err: any, tx: any) => {
    //       if (err) {
    //         console.error('Error fetching transaction:', err);
    //         return;
    //       }
    //       transactions.push(tx);
    //       // If all transactions are fetched, log them
    //       if (transactions.length === count) {
    //         console.log("transactions", transactions);
    //       }
    //     });
    //   }
    // });
  }
}