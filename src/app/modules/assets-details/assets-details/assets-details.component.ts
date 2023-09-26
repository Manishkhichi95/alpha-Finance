import { Component, Inject, OnInit } from '@angular/core';
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
  PoolConfigurator_Proxy_AaveAddress: any;
  PoolConfigurator_Proxy_AaveABI: any;
  Pool_Proxy_Aave: any;
  Addresscontract: any;

  constructor(private Web3Service: Web3Service, private http: HttpClient, public dialogRef: MatDialogRef<AssetsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.web3 = this.Web3Service.getWeb3();
    this.accounts = localStorage.getItem('walletAddress');
    this.http.get('assets/json/ABIs&Addresses.json').subscribe((item: any) => {
      this.Pool_Proxy_Aave_ABI = item.Pool_Proxy_Aave_ABI;
      this.Pool_Proxy_Aave_Address = item.Pool_Proxy_Aave_Address;
      this.ABI_ARRAY = item.ERC_20_TOKEN_contract;
      this.PoolConfigurator_Proxy_AaveAddress = item.PoolConfigurator_Proxy_AaveAddress;
      this.PoolConfigurator_Proxy_AaveABI = item.PoolConfigurator_Proxy_AaveABI;
      this.Pool_Proxy_Aave = new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
      this.Addresscontract = new this.web3.eth.Contract(this.ABI_ARRAY, this.data.address);

    });
  }

  openTab(tabName: any) {
    this.currentTab = tabName;
  }

  async approve() {
    const amount = this.depositValue * Math.pow(10, 18);
    if (this.data.connected == "true") {
      try {
        const balance = await this.Addresscontract.methods.balanceOf(this.accounts).call();
        if (Number(balance) < Number(amount)) {
          throw new Error('Insufficient balance to perform the transaction.');
        }
        const result = await this.Addresscontract.methods.approve(this.Pool_Proxy_Aave_Address, amount.toString()).send({
          from: this.accounts,
          data: await this.Addresscontract.methods.approve(this.Pool_Proxy_Aave_Address, amount.toString()).encodeABI()
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
    if (this.data.connected == "true") {
      const amount = this.borrowValue * Math.pow(10, 17);
      const interestRateMode = 1;
      const referralCode = 0;
      console.log(this.accounts,amount)
      try {
        const balance = await this.web3.eth.getBalance(this.accounts);
        const gas = await this.Pool_Proxy_Aave.methods.borrow(this.data.address, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.accounts).estimateGas({ from: this.accounts });
        const result = await this.Pool_Proxy_Aave.methods.borrow(this.data.address,  amount.toString(), interestRateMode.toString(), referralCode.toString(), this.accounts).send({
          from: this.accounts,
          data: await this.Pool_Proxy_Aave.methods.borrow(this.data.address, amount.toString(), interestRateMode.toString(), referralCode.toString(), this.accounts).encodeABI(),
          gas: gas,
        });
        console.log('Transaction hash:', result);
      } catch (error) {
        console.error('Errorasdfbhsd:', error);
      }
    }
    else {
      alert("Please connect the Wallet")
    }
  }

  async supplyAmount() {
    console.log(this.accounts)
    if (this.data.connected == "true") {
      const amount = this.borrowValue * Math.pow(10, 17);
      const referralCode = 0;
      const gas = await this.Pool_Proxy_Aave.methods.supply(this.data.address, amount.toString(), this.accounts, referralCode).estimateGas({ from: this.accounts });
      try {
        const balance = await this.web3.eth.getBalance(this.accounts);
        console.log('balance', balance)
        const result = await this.Pool_Proxy_Aave.methods.supply(this.data.address, amount.toString(), this.accounts, referralCode).send({
          from: this.accounts,
          data: await this.Pool_Proxy_Aave.methods.supply(this.data.address, amount.toString(), this.accounts, referralCode).encodeABI(),
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