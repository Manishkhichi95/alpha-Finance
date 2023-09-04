import {MatDialog} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WallletOverlayComponent } from './modules/wallet-overlay/walllet-overlay/walllet-overlay.component';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alpha-finance-launch';
  connected = false;
  selectedAddress: string | undefined;
  balance: string | undefined;
  walletAddress: string | null = localStorage.getItem('walletAddress');
  reqAccounts: string[] | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.checkConnectionStatus();
  }

  async openMetaMask() {
    if (!window.ethereum) {
      this.handleConnectionError('MetaMask extension not found.');
      return;
    }

    try {
      this.reqAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (this.reqAccounts && this.reqAccounts.length > 0) {
        this.connected = true;
        this.selectedAddress = this.reqAccounts[0];
        localStorage.setItem('walletAddress', this.selectedAddress);
        console.log('Connected to MetaMask. Selected address:', this.selectedAddress);

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
        params: [this.selectedAddress!, 'latest']
      });
      this.checkConnectionStatus();
    } catch (error) {
      console.error('Error updating wallet details:', error);
    }
  }

  checkConnectionStatus() {
    if (!window.ethereum) {
      this.connected = false;
      this.selectedAddress = undefined;
      return;
    }

    const walletAddress = this.walletAddress?.toLowerCase();

    if (!walletAddress) {
      this.connected = false;
      this.selectedAddress = undefined;
      return;
    }

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        const connectedAddress = accounts.length > 0 ? accounts[0] : undefined;

        if (connectedAddress && connectedAddress.toLowerCase() === walletAddress) {
          this.connected = true;
          this.selectedAddress = connectedAddress;
          this.updateWalletDetails();
        } else {
          this.connected = false;
          this.selectedAddress = undefined;
        }
      })
      .catch(() => {
        this.connected = false;
        this.selectedAddress = undefined;
      });
  }

  handleConnectionError(errorMessage: string) {
    this.connected = false;
    alert(errorMessage);
    console.error(errorMessage);
  }

  openWalletModal(){
      const dialogRef = this.dialog.open(WallletOverlayComponent, { 
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
      })
    
  }
  }