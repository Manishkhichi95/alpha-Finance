import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { WallletOverlayComponent } from './modules/wallet-overlay/walllet-overlay/walllet-overlay.component';
import { AssetsDetailsComponent } from './modules/assets-details/assets-details/assets-details.component';
import { readContractsService } from './services/readContracts.service';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alpha-finance-launch';
  ContractData: any = [];
  
  constructor(public dialog: MatDialog, private readContractsService: readContractsService) {

    this.readContractsService.getTotalBorrows().then((data) => {
      this.ContractData = data;
    });
  }

  openWalletModal() {
    const dialogRef = this.dialog.open(WallletOverlayComponent);
  }

  openAssetsModel() {
    const dialogRef = this.dialog.open(AssetsDetailsComponent);
  }
}