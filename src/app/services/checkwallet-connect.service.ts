import { Injectable } from '@angular/core';
import { Web3Service } from './WEb3Service.service';
import { readContractsService } from './readContracts.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CheckwalletConnectService {
  balance: any;
  walletAddress: any;
  selectedAddress: any;
  connected: boolean = false;

  constructor(private web3Service: Web3Service,
    private readContractService: readContractsService) {
    this.web3Service.walletAddress.subscribe((address: string) => { this.walletAddress = address });
  }

  // checkConnectionStatus() {
    // debugger
    // if (window.ethereum) {
      // window.ethereum.on('accountsChanged', (accounts: string[]) => {
      //   if (accounts.length === 0 || !this.walletAddress && !this.connected) {
      //     this.disconnectWallet();
      //   } else 
      //   if (accounts[0].toLowerCase() !== this.walletAddress.toLowerCase() && this.connected) {
      //     this.selectedAddress = accounts[0].toLowerCase();
      //     this.updateWalletDetails();
      //     this.web3Service.walletAddress.next(this.selectedAddress);
      //     localStorage.setItem('walletAddress', this.selectedAddress);
      //     this.connected = true;
      //     this.web3Service.connected.next(this.connected);
      //   } else if (!this.connected) {
      //     this.disconnectWallet();
      //   }
      // });
      // window.ethereum.on('disconnect', (error: { code: number; message: string }) => {
      //   if (error.code === 4001) {
      //     this.disconnectWallet();
      //   }
      // });
    // }
  // }

  async connectWallet() {
    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        this.connected = true;
        this.walletAddress = accounts[0];
        this.selectedAddress = accounts[0];
        this.web3Service.connected.next(this.connected);
        localStorage.setItem('walletAddress', this.walletAddress);
        this.web3Service.walletAddress.next(this.walletAddress);
        localStorage.setItem('connected', JSON.stringify(this.connected));
        this.web3Service.connected.next(true)
        console.log('Connected to MetaMask. Selected address:', this.walletAddress);
        this.updateWalletDetails();
      } else {
        this.handleConnectionError('No accounts found.');
      }
    } catch (error) {
      this.handleConnectionError('An error occurred while connecting to MetaMask.');
      console.error('Error connecting to MetaMask:', error);
    }
  }

  async updateWalletDetails() {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [this.walletAddress!, 'latest']
      });
      this.balance = Number(balance);
    } catch (error) {
      console.error('Error updating wallet details:', error);
    }
  }

  disconnectWallet() {
    this.connected = false;
    this.walletAddress = '';
    localStorage.removeItem("walletAddress");
    this.web3Service.connected.next(this.connected);
    this.web3Service.walletAddress.next(this.walletAddress);
    localStorage.setItem('connected', JSON.stringify(this.connected));
    const element: any = document.getElementById("disConnect");
    element.style.display = "none";
  }

  handleConnectionError(errorMessage: string) {
    this.connected = false;
    this.web3Service.connected.next(this.connected);
    alert(errorMessage);
    console.error(errorMessage);
  }
}    