import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WallletOverlayComponent } from '../../wallet-overlay/walllet-overlay/walllet-overlay.component';
import { AssetsDetailsComponent } from '../../assets-details/assets-details/assets-details.component';
import { readContractsService } from 'src/app/services/readContracts.service';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'alpha-finance-launch';
  ContractData: any = [];
  walletAddress: any;
  connected: any;
  balance: any;
  constructor(private router: Router, public dialog: MatDialog, private readContractsService: readContractsService, private web3Service: Web3Service) {
    this.walletAddress = localStorage.getItem('walletAddress');
    this.readContractsService.getReserveData().then((data: any) => {
      this.ContractData = data;
    });
  }

  ngOnInit() {
    this.connected = this.web3Service.getConnected();
  }

  openWalletModal() {
    const dialogRef = this.dialog.open(WallletOverlayComponent);
  }

  openAssetsModel(address: any) {
    const data = {
      "address": address,
      "connected": this.connected
    }
    const dialogRef = this.dialog.open(AssetsDetailsComponent,
      { data: data });
  }

  gotoReserveOverview(item: any) {
    this.readContractsService.getSelectedReserve(item);
    this.router.navigate(['reserve-overview']);
  }
}