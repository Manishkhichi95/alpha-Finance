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
  private isDisconnectedKey = 'isDisconnected';

  constructor(private http: HttpClient) {
    this.initializeWeb3();
  }

  private initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);

      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0 && !this.connected) {
          this.disconnectWallet();
        } else if (!this.getIsDisconnected()) {
          this.connected.next(true);
        }
      });

      if (!this.getIsDisconnected()) {
        this.checkAccountConnection();
      }
    } else {
      this.handleNoWeb3();
    }
  }

  private async checkAccountConnection() {
    try {
      const accounts = await this.web3.eth.requestAccounts();
      if (accounts.length > 0) {
        this.connected.next(true);
      }
    } catch (error) {
      this.connected.next(false);
    }
  }

  private handleNoWeb3() {
    this.walletAddress.next('');
    this.connected.next(false);
    localStorage.removeItem('walletAddress');
    console.error('Web3 not found. Please install MetaMask or a compatible Ethereum wallet.');
  }

  disconnectWallet() {
    this.setIsDisconnected(true);
    this.walletAddress.next('');
    this.connected.next(false);
    localStorage.removeItem('walletAddress');
    localStorage.setItem('connected', JSON.stringify(false));
  }

  connectWallet() {
    this.setIsDisconnected(false);
    this.checkAccountConnection();
  }

  private setIsDisconnected(value: boolean) {
    localStorage.setItem(this.isDisconnectedKey, JSON.stringify(value));
  }

  private getIsDisconnected(): boolean {
    const isDisconnected = localStorage.getItem(this.isDisconnectedKey);
    return isDisconnected ? JSON.parse(isDisconnected) : false;
  }

  getWeb3() {
    return this.web3;
  }
}