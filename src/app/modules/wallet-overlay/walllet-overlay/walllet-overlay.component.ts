import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
declare let window: any;
@Component({
  selector: 'app-walllet-overlay',
  templateUrl: './walllet-overlay.component.html',
  styleUrls: ['./walllet-overlay.component.css']
})
export class WallletOverlayComponent implements OnInit {
  title = 'alpha-finance-launch';
  connected = false;
  selectedAddress: string | undefined;
  balance: string | undefined;
  walletAddress: string | null = localStorage.getItem('walletAddress');
  reqAccounts: string[] | undefined;

  constructor(private dialogRef: MatDialogRef<WallletOverlayComponent>) { }

  ngOnInit() {
    this.checkConnectionStatus();
  }

  async openWallet() {
    if (!window.ethereum) {
      this.handleConnectionError('MetaMask extension not found.');
      this.dialogRef.close('MetaMask extension not found.');
      return;
    }

    try {
      this.reqAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (this.reqAccounts && this.reqAccounts.length > 0) {
        this.connected = true;
        this.selectedAddress = this.reqAccounts[0];
        localStorage.setItem('walletAddress', this.selectedAddress);
        console.log('Connected to MetaMask. Selected address:', this.selectedAddress);
        alert('wallet Connected')
        this.dialogRef.close('Wallet Connected');
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

  closeModel() {
    this.dialogRef.close()
  }
}
