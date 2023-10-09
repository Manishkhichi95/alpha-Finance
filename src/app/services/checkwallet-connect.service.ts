// import { Injectable } from '@angular/core';

// declare let window: any;
// @Injectable({
//   providedIn: 'root'
// })
// export class CheckwalletConnectService {
//  balance: any;
//   selectedAddress: any;
//   connected: boolean = false;
//   walletAddress: any;

//   constructor() {
//     this.walletAddress = localStorage.getItem('walletAddress');
//   }
  
//   CheckaccountsChanged() {
//     window.ethereum.on('accountsChanged', async () => {
//       const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       localStorage.setItem('walletAddress', changedAccounts[0])
//       if (!window.ethereum) {
//         this.connected = false;
//         localStorage.removeItem('walletAddress')
//         this.selectedAddress = undefined;
//         return;
//       }

//       const walletAddress: any = localStorage.setItem('walletAddress', changedAccounts[0]);
//       location.reload();
//       if (!walletAddress) {
//         this.connected = false;
//         localStorage.setItem('connected', this.connected.toString());
//         this.selectedAddress = undefined;
//         return;
//       }

//       window.ethereum
//         .request({ method: 'eth_accounts' })
//         .then((accounts: string[]) => {
//           const connectedAddress = accounts.length > 0 ? accounts[0] : undefined;
//           if (connectedAddress && connectedAddress.toLowerCase() == walletAddress) {
//             this.selectedAddress = connectedAddress;
//              this.updateWalletDetails();
//             this.connected = true;
//             localStorage.setItem('connected', this.connected.toString());
//           } else {
//             this.connected = false;
//             localStorage.setItem('connected', this.connected.toString());
//             this.selectedAddress = undefined;
//           }
//         })
//         .catch(() => {
//           this.connected = false;
//           localStorage.setItem('connected', this.connected.toString());
//           this.selectedAddress = undefined;
//         });
//     });
//     console.log('onInit', this.connected)
//   }

//   async updateWalletDetails():Promise<any>{
//     try {
//       this.balance = await window.ethereum.request({
//         method: 'eth_getBalance',
//         params: [this.selectedAddress!, 'latest']
//       });
//       this.checkConnectionStatus();
//     } catch (error) {
//       console.error('Error updating wallet details:', error);
//     }
//   }

//    checkConnectionStatus() {
//     if (!window.ethereum) {
//       localStorage.removeItem('walletAddress')
//       this.selectedAddress = undefined;
//       return;
//     }

//     const walletAddress = this.walletAddress?.toLowerCase();
//     if (!walletAddress) {
//       this.connected = false;
//       localStorage.setItem('connected', this.connected.toString());
//       this.selectedAddress = undefined;
//       return;
//     }

//     window.ethereum
//       .request({ method: 'eth_accounts' })
//       .then((accounts: string[]) => {
//         const connectedAddress = accounts.length > 0 ? accounts[0] : undefined;
//         if (connectedAddress && connectedAddress.toLowerCase() == walletAddress) {
//           this.selectedAddress = connectedAddress;
//           this.updateWalletDetails();
//           this.connected = true;
//           localStorage.setItem('connected', this.connected.toString());
//         } else {
//           this.connected = false;
//           localStorage.setItem('connected', this.connected.toString());
//           this.selectedAddress = undefined;
//         }
//       })
//       .catch(() => {
//         this.connected = false;
//         localStorage.setItem('connected', this.connected.toString());
//         this.selectedAddress = undefined;
//       });
//   }
// }

import { Injectable } from '@angular/core';

declare let window: any;

interface WalletDetails {
  balance: any;
  selectedAddress: any;
  connected: boolean;
  walletAddress: any;
}

@Injectable({
  providedIn: 'root'
})
export class CheckwalletConnectService {
  walletDetails: WalletDetails = {
    balance: null,
    selectedAddress: null,
    connected: false,
    walletAddress: null
  };

  constructor() {
    this.walletDetails.walletAddress = localStorage.getItem('walletAddress');
  }

   async updateWalletDetails(){
    try {
      this.walletDetails.balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [this.walletDetails.selectedAddress, 'latest']
      });
      this.checkConnectionStatus();
    } catch (error) {
      console.error('Error updating wallet details:', error);
    }
  }

   handleAccountChange(accounts: string[]) {
    const connectedAddress = accounts.length > 0 ? accounts[0] : undefined;
    if (connectedAddress && connectedAddress.toLowerCase() === this.walletDetails.walletAddress) {
      this.walletDetails.selectedAddress = connectedAddress;
      this.updateWalletDetails();
      this.walletDetails.connected = true;
    } else {
      this.walletDetails.connected = false;
      this.walletDetails.selectedAddress = undefined;
    }

    localStorage.setItem('connected', this.walletDetails.connected.toString());
  }

   CheckaccountsChanged(){
    window.ethereum.on('accountsChanged', async () => {
      const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      localStorage.setItem('walletAddress', changedAccounts[0]);

      if (!window.ethereum) {
        this.walletDetails.connected = false;
        localStorage.removeItem('walletAddress');
        this.walletDetails.selectedAddress = undefined;
        return;
      }

      this.handleAccountChange(changedAccounts);
    });

    console.log('onInit', this.walletDetails.connected);
  }

   checkConnectionStatus() {
    if (!window.ethereum) {
      localStorage.removeItem('walletAddress');
      this.walletDetails.selectedAddress = undefined;
      return;
    }

    const walletAddress = this.walletDetails.walletAddress?.toLowerCase();
    if (!walletAddress) {
      this.walletDetails.connected = false;
      localStorage.setItem('connected', this.walletDetails.connected.toString());
      this.walletDetails.selectedAddress = undefined;
      return;
    }

    window.ethereum.request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        this.handleAccountChange(accounts);
      })
      .catch(() => {  
        this.walletDetails.connected = false;
        localStorage.setItem('connected', this.walletDetails.connected.toString());
        this.walletDetails.selectedAddress = undefined;
      });
  }
}