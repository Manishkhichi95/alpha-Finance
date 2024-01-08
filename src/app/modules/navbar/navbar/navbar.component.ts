import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import { CheckwalletConnectService } from 'src/app/services/checkwallet-connect.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  balance: number = 0;
  connected: boolean = false;
  walletAddress: any;
  selectedAddress: string | undefined;
  copied: boolean = false;

  constructor(private clipboard: Clipboard, private web3Service: Web3Service, private readContractsService: readContractsService,
    private checkConnectStatus: CheckwalletConnectService, private route: Router
  ) {
    this.checkConnectStatus.checkConnectionStatus();
  }

  ngOnInit() {
    this.web3Service.walletAddress.subscribe((address: string) => {
      this.walletAddress = address;
    });
    this.web3Service.connected.subscribe((res: any) => {
      this.connected = res;
    });
    this.checkConnectStatus.checkConnectionStatus();
  }

  openDialog() {
    const element: any = document.getElementById("disConnect");
    if (element.style.display === "none" || element.style.display === undefined) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  disconnectWallet() {
    this.checkConnectStatus.disconnectWallet();
  }

  connectWallet() {
    this.checkConnectStatus.connectWallet();
  }

  copyToClipBoard() {
    this.clipboard.copy(this.walletAddress);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 700);
  }

  navigateTo(url: string) {
    switch (url) {
      case '/market':
        this.route.navigateByUrl(url)
        break;
      case '/dashboard-wallet-connected':
        this.route.navigateByUrl(url)
        break;
      case '/manage-wallet-connected':
        this.route.navigateByUrl(url)
        break;
      case '/bridge':
        this.route.navigateByUrl(url)
        break;
    }
  }
}