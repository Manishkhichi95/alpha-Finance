import { Component, OnInit } from '@angular/core';
import { readContractsService } from './services/readContracts.service';
import { Web3Service } from './services/WEb3Service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  balance: number = 0;
  ContractData: any = [];
  connected: boolean = false;
  walletAddress: string | null;
  title = 'alpha-finance-launch';
  reqAccounts: string[] | undefined;
  selectedAddress: string | undefined;
  constructor(private readContractsService: readContractsService, private web3Service: Web3Service,
    private router: Router) {
    this.walletAddress = localStorage.getItem('walletAddress');
    this.checkConnectionStatus();
  }

  checkConnectionStatus() {
    if (!window.ethereum) {
      localStorage.removeItem('walletAddress')
      this.selectedAddress = undefined;
      return;
    }
    const walletAddress = this.walletAddress?.toLowerCase();
    if (!walletAddress) {
      this.connected = false;
      this.web3Service.getConnection(this.connected);
      this.selectedAddress = undefined;
      return;
    }

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        const connectedAddress = accounts.length > 0 ? accounts[0] : undefined;
        if (connectedAddress && connectedAddress.toLowerCase() == walletAddress) {
          this.selectedAddress = connectedAddress;
          this.updateWalletDetails();
          this.connected = true;
          this.web3Service.getConnection(this.connected);
        } else {
          this.connected = false;
          this.web3Service.getConnection(this.connected);
          this.selectedAddress = undefined;
        }
      })
      .catch(() => {
        this.connected = false;
        this.web3Service.getConnection(this.connected);
        this.selectedAddress = undefined;
      });
  }

  ngOnInit() {
    this.checkConnectionStatus();
  }

  async connectWallet() {
    if (!window.ethereum) {
      this.handleConnectionError('MetaMask extension not found.');
      return;
    }

    try {
      this.reqAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (this.reqAccounts && this.reqAccounts.length > 0) {
        this.connected = true;
        this.walletAddress = this.reqAccounts[0];
        localStorage.setItem('walletAddress', this.walletAddress);
        console.log('Connected to MetaMask. Selected address:', this.walletAddress);
        alert('wallet Connected')
        this.updateWalletDetails();
      } else {
        this.handleConnectionError('No accounts found.');
      }
    } catch (error) {
      this.handleConnectionError('An error occurred while connecting to MetaMask.');
    }
  }

  async updateWalletDetails() {
    try {
      this.balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [this.walletAddress!, 'latest']
      });
      this.checkConnectionStatus();
    } catch (error) {
      console.error('Error updating wallet details:', error);
    }
  }

  handleConnectionError(errorMessage: string) {
    this.connected = false;
    alert(errorMessage);
    console.error(errorMessage);
  }
}