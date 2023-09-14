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
    @Inject(MAT_DIALOG_DATA) public ERC_20_TOKEN_contractAddress: any) {

    this.http.get('assets/json/ABIs&Addresses.json').subscribe((data: any) => {
      this.Pool_Proxy_Aave_ABI = data.Pool_Proxy_Aave_ABI;
      this.Pool_Proxy_Aave_Address = data.Pool_Proxy_Aave_Address;
      this.ABI_ARRAY = data.ERC_20_TOKEN_contract;
    });

    this.accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
    this.web3 = this.Web3Service.getWeb3();
  }

  openTab(tabName: any) {
    this.currentTab = tabName;
  }

  async approve() {
    const amount = this.depositValue * Math.pow(10, 14);
    const accounts = await this.accounts;
    try {
      const balance = await this.web3.eth.getBalance(accounts[0]);
      if (Number(balance) < Number(amount)) {
        throw new Error('Insufficient balance to perform the transaction.');
      }
      const contract = new this.web3.eth.Contract(this.ABI_ARRAY, this.ERC_20_TOKEN_contractAddress);
      const result = await contract.methods.approve(this.Pool_Proxy_Aave_Address, amount).send({
        from: accounts[0],
        data: await contract.methods.approve(this.Pool_Proxy_Aave_Address, amount).encodeABI()
      });

      console.log('Transaction hash:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async borrowAmount() {
    const amount = this.borrowValue * Math.pow(10, 14);
    const accounts = await this.accounts;
    const interestRateMode = 1;
    const referralCode = 0;
    const contract = new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
    const gas = await contract.methods.borrow(this.ERC_20_TOKEN_contractAddress, amount, interestRateMode, referralCode, accounts[0]).estimateGas({ from: accounts[0] });
    try {
      const result = await contract.methods.borrow(this.ERC_20_TOKEN_contractAddress, amount, interestRateMode, referralCode, accounts[0]).send({
        from: accounts[0],
        data: await contract.methods.borrow(this.ERC_20_TOKEN_contractAddress, amount, interestRateMode, referralCode, accounts[0]).encodeABI(),
        gas: gas,
      });
      console.log('Transaction hash:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async supplyAmount() {
    const amount = this.borrowValue * Math.pow(10, 14);
    const accounts = await this.accounts;
    const referralCode = '0';
    const contract = new this.web3.eth.Contract(this.Pool_Proxy_Aave_ABI, this.Pool_Proxy_Aave_Address);
    try {
      const result = await contract.methods.supply(this.ERC_20_TOKEN_contractAddress, amount, accounts[0], referralCode).send({
        from: accounts[0],
        data: await contract.methods.supply(this.ERC_20_TOKEN_contractAddress, amount, accounts[0], referralCode).encodeABI(),
      });
      console.log('Transaction hash:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
