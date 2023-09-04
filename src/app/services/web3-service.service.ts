import { Injectable } from '@angular/core';
import { Web3 } from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: Web3 | any;

  constructor() {
    typeof window.ethereum !== 'undefined' ? this.web3 = new Web3(window.ethereum) :
      console.log('No Ethereum provider found. Please install MetaMask.');

  }

  async getAccounts() {
    return await this.web3.eth.getAccounts();
  }
  getWeb3Instance(): Web3 {
    return this.web3.eth;
  }
}