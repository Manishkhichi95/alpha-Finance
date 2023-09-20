import { Component, Inject } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare global {
  interface Window {
    ethereum?: any;
  }
}
@Component({
  selector: 'app-assets-details',
  templateUrl: './assets-details.component.html',
  styleUrls: ['./assets-details.component.css']
})
export class AssetsDetailsComponent {
  currentTab: string = 'tab1';
  depositValue: any;
  borrowValue: any;
  ABI_ARRAY: any;
  Pool_Proxy_Aave_Address: string = '';
  Pool_Proxy_Aave_ABI: any;
  web3: any;
  accounts: any;

  constructor(private Web3Service: Web3Service, private http: HttpClient, public dialogRef: MatDialogRef<AssetsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.http.get('assets/json/ABIs&Addresses.json').subscribe((item: any) => {
      this.Pool_Proxy_Aave_ABI = item.Pool_Proxy_Aave_ABI;
      this.Pool_Proxy_Aave_Address = item.Pool_Proxy_Aave_Address;
      this.ABI_ARRAY = item.ERC_20_TOKEN_contract;
    });
    this.accounts = localStorage.getItem('walletAdress');
    this.web3 = this.Web3Service.getWeb3();
  }

  openTab(tabName: any) {
    this.currentTab = tabName;
  }

  async approve() {
    const amount = this.depositValue * Math.pow(10, 14);
    if (this.data.connected == "true") {
      try {
        const balance = await this.web3.eth.getBalance(this.accounts);
        if (Number(balance) < Number(amount)) {
          throw new Error('Insufficient balance to perform the transaction.');
        }
        const contract = new this.web3.eth.Contract(this.ABI_ARRAY, this.data.address);
        const result = await contract.methods.approve(this.Pool_Proxy_Aave_Address, amount).send({
          from: this.accounts,
          data: await contract.methods.approve(this.Pool_Proxy_Aave_Address, amount).encodeABI()
        });

        console.log('Transaction hash:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      alert("Please connect the Wallet")
    }
  }

  async borrowAmount() {
    debugger;
    if (this.data.connected == "true") {
      const amount = this.borrowValue * Math.pow(10, 14);
      const interestRateMode = 1;
      const referralCode = 0;
      const contract = new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
      const gas = await contract.methods.borrow(this.data.address, amount, interestRateMode, referralCode, this.accounts).estimateGas({ from: this.accounts });
      try {
        const result = await contract.methods.borrow(this.data.address, amount, interestRateMode, referralCode, this.accounts).send({
          from: this.accounts,
          data: await contract.methods.borrow(this.data.address, amount, interestRateMode, referralCode, this.accounts).encodeABI(),
          gas: gas,
        });
        console.log('Transaction hash:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      alert("Please connect the Wallet")
    }
  }

  async supplyAmount() {
    if (this.data.connected == "true") {
      const amount = this.borrowValue * Math.pow(10, 14);
      const referralCode = 0;
      const contract = new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
      const gas = await contract.methods.supply(this.data.address, amount, this.accounts, referralCode).estimateGas({ from: this.accounts });
      try {
        const result = await contract.methods.supply(this.data.address, amount, this.accounts, referralCode).send({
          from: this.accounts,
          data: await contract.methods.supply(this.data.address, amount, this.accounts, referralCode).encodeABI(),
          gas: gas
        });
        console.log('Transaction hash:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      alert("Please connect the Wallet")
    }
  }
}
