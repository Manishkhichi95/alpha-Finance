import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3 | any;
  walletAddress = new BehaviorSubject<string>('');
  connected = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/2da7c909760242dd8f879c0f7f76fbd6'));
    const connected: any = localStorage.getItem('connected');
    this.connected.next(JSON.parse(connected))
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      this.walletAddress.next("");
      console.error('Web3 not found. Please install MetaMask or a compatible Ethereum wallet.');
    }
  }

  getWeb3() {
    return this.web3;
  }
}