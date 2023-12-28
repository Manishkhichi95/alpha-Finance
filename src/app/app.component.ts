import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Web3Service } from './services/WEb3Service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  balance: number = 0;
  connected: boolean = false;
  walletAddress: any;
  selectedAddress: string | undefined;
  copied: boolean = false;

  constructor(private clipboard: Clipboard,
    private web3Service: Web3Service
  ) {
    this.walletAddress = localStorage.getItem('walletAddress');
    this.checkConnectionStatus();
  }

  async checkConnectionStatus() {
    if (!window.ethereum) {
      this.disconnectWallet();
      return;
    }

    if (!this.walletAddress) {
      this.disconnectWallet();
      return;
    }

    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
      const connectedAddress = accounts.length > 0 ? accounts[0].toLowerCase() : undefined;
      if (connectedAddress && connectedAddress === this.walletAddress.toLowerCase()) {
        this.selectedAddress = connectedAddress;
        this.updateWalletDetails();
        this.connected = true;
        this.web3Service.connected.next(this.connected);
      } else {
        this.disconnectWallet();
      }
    } catch (error) {
      this.disconnectWallet();
      console.error('Error checking connection status:', error);
    }
  }

  ngOnInit() {
    this.checkConnectionStatus();
  }

  async connectWallet() {
    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        this.connected = true;
        this.walletAddress = accounts[0];
        this.selectedAddress = accounts[0];
        this.web3Service.connected.next(this.connected);
        localStorage.setItem('walletAddress', this.walletAddress);
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
    this.web3Service.connected.next(this.connected);
    this.walletAddress = null;
    this.selectedAddress = undefined;
    localStorage.removeItem('walletAddress');
    this.balance = 0;
    const element: any = document.getElementById("disConnect");
    element.style.display = "none";
  }

  handleConnectionError(errorMessage: string) {
    this.connected = false;
    this.web3Service.connected.next(this.connected);
    alert(errorMessage);
    console.error(errorMessage);
  }

  openDialog() {
    const element: any = document.getElementById("disConnect");
    if (element.style.display === "none" || element.style.display === undefined) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  copyToClipBoard() {
    this.clipboard.copy(this.walletAddress);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 700);
  }
}