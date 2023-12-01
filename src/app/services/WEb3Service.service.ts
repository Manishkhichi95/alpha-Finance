import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3 | any;
  connected = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/2da7c909760242dd8f879c0f7f76fbd6'));
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('Web3 not found. Please install MetaMask or a compatible Ethereum wallet.');
    }
  }

  getConnection(connected: boolean) {
    this.connected.next(connected);
  }
  getWeb3() {
    return this.web3;
  }
}