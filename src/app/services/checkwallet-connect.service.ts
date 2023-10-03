import { Injectable } from '@angular/core';

declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class CheckwalletConnectService {
 balance: any;
  selectedAddress: any;
  connected: boolean = false;
  walletAddress: any;

  constructor() {
    this.walletAddress = localStorage.getItem('walletAddress');
  }
  
  CheckaccountsChanged() {
    window.ethereum.on('accountsChanged', async () => {
      const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      localStorage.setItem('walletAddress', changedAccounts[0])
      if (!window.ethereum) {
        this.connected = false;
        localStorage.removeItem('walletAddress')
        this.selectedAddress = undefined;
        return;
      }

      const walletAddress: any = localStorage.setItem('walletAddress', changedAccounts[0]);
      location.reload();
      if (!walletAddress) {
        this.connected = false;
        localStorage.setItem('connected', this.connected.toString());
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
            localStorage.setItem('connected', this.connected.toString());
          } else {
            this.connected = false;
            localStorage.setItem('connected', this.connected.toString());
            this.selectedAddress = undefined;
          }
        })
        .catch(() => {
          this.connected = false;
          localStorage.setItem('connected', this.connected.toString());
          this.selectedAddress = undefined;
        });
    });
    console.log('onInit', this.connected)
  }

  async updateWalletDetails():Promise<any>{
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
      localStorage.removeItem('walletAddress')
      this.selectedAddress = undefined;
      return;
    }

    const walletAddress = this.walletAddress?.toLowerCase();
    if (!walletAddress) {
      this.connected = false;
      localStorage.setItem('connected', this.connected.toString());
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
          localStorage.setItem('connected', this.connected.toString());
        } else {
          this.connected = false;
          localStorage.setItem('connected', this.connected.toString());
          this.selectedAddress = undefined;
        }
      })
      .catch(() => {
        this.connected = false;
        localStorage.setItem('connected', this.connected.toString());
        this.selectedAddress = undefined;
      });
  }
}