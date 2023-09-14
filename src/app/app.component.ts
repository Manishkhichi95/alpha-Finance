import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { WallletOverlayComponent } from './modules/wallet-overlay/walllet-overlay/walllet-overlay.component';
import { AssetsDetailsComponent } from './modules/assets-details/assets-details/assets-details.component';
import { readContractsService } from './services/readContracts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alpha-finance-launch';
  ContractData: any = [];
  
  constructor(public dialog: MatDialog, private readContractsService: readContractsService) {

    this.readContractsService.getReserveData().then((data) => {
      this.ContractData = data;
    });
  }

  openWalletModal() {
    const dialogRef = this.dialog.open(WallletOverlayComponent);
  }

  openAssetsModel(address:any) {
    const dialogRef = this.dialog.open(AssetsDetailsComponent,
      {data:address});
  }
}