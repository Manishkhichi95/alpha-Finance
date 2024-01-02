import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Web3Service } from './WEb3Service.service';
import { readContractsService } from './readContracts.service';
@Injectable({
  providedIn: 'root'
})
export class CheckwalletConnectService {
  balance: number = 0;
  connected: boolean = false;
  walletAddress: any;
  selectedAddress: string | undefined;
  copied: boolean = false;
  constructor(private clipboard: Clipboard,
    private web3Service: Web3Service,private readContractsService : readContractsService
  ) {
    this.walletAddress = localStorage.getItem('walletAddress');
    this.setupMetamaskListeners(); 
  }


  setupMetamaskListeners() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log("accounts[0]",accounts[0])
        if (accounts.length === 0 || !this.walletAddress) {
          this.disconnectWallet();
        } else if (accounts[0]) {
          this.selectedAddress = accounts[0];
          this.web3Service.walletAddress.next(this.selectedAddress);
          this.updateWalletDetails();
          this.connected = true;
          this.web3Service.connected.next(this.connected);
        } else {
          this.disconnectWallet();
        }
      });

      window.ethereum.on('disconnect', (error: { code: number; message: string }) => {
        if (error.code === 4001) {
          this.disconnectWallet();
        }
      });
    }
  }

  async checkConnectionStatus() {
    debugger
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
      if (connectedAddress === this.walletAddress.toLowerCase()) {
        this.selectedAddress = connectedAddress;
        this.updateWalletDetails();
        this.web3Service.walletAddress.next(this.selectedAddress)
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

  async connectWallet() {
    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        this.connected = true;
        this.walletAddress = accounts[0];
        console.log('connectWallet',this.walletAddress)
        this.selectedAddress = accounts[0];
        this.readContractsService.getReserveData();
        this.web3Service.connected.next(this.connected);
        localStorage.setItem('walletAddress', this.walletAddress);
        this.web3Service.walletAddress.next(this.walletAddress);
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