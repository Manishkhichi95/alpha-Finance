import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3 | any;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://arbitrum-sepolia.infura.io/v3/e5c4e4c56f664092a2a99659443e93b4'));
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('Web3 not found. Please install MetaMask or a compatible Ethereum wallet.');
    }
  }

  getWeb3() {
    return this.web3;
  }
}