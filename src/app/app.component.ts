import { MatDialog } from '@angular/material/dialog';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WallletOverlayComponent } from './modules/wallet-overlay/walllet-overlay/walllet-overlay.component';
import { AssetsDetailsComponent } from './modules/assets-details/assets-details/assets-details.component';
import { readContractsService } from './services/readContracts.service';
import { Web3Service } from './services/WEb3Service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alpha-finance-launch';
  ContractData: any = [];
  balance: any;
  selectedAddress: any;
  connected: boolean = false;
  walletAddress: any;

  constructor(public dialog: MatDialog, private readContractsService: readContractsService, private web3Service: Web3Service) {
    this.walletAddress = localStorage.getItem('walletAddress');
    this.checkConnectionStatus();
    this.readContractsService.getReserveData().then((data: any) => {
      this.ContractData = data;
    });
  }

  ngOnInit() {
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
      // this.walletAddress=changedAccounts[0];
      // localStorage.setItem('walletAddress',this.walletAddress)
      // console.log(this.walletAddress)
      // console.log('changedAccounts')
    });
    console.log('onInit', this.connected)
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

  handleConnectionError(errorMessage: string) {
    this.connected = false;
    alert(errorMessage);
    console.error(errorMessage);
  }


  openWalletModal() {
    const dialogRef = this.dialog.open(WallletOverlayComponent);
  }

  openAssetsModel(address: any) {
    const dialogRef = this.dialog.open(AssetsDetailsComponent,
      { data: address });
  }
}