import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { CheckwalletConnectService } from 'src/app/services/checkwallet-connect.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  walletAddress: any;
  balance: number = 0;
  copied: boolean = false;
  market: boolean = false;
  manage: boolean = false;
  bridge: boolean = false;
  dashboard: boolean = false;
  connected: boolean = false;
  selectedAddress: string | undefined;
  constructor(private clipboard: Clipboard, private router: Router,
    private web3Service: Web3Service, private ConnectionCheck: CheckwalletConnectService,
  ) {
  }

  @ViewChild('dashboard') dashboardLink: ElementRef | undefined;

  ngOnInit() {
    this.web3Service.walletAddress.subscribe((res: any) => {
      if (res == '') {
        this.walletAddress = localStorage.getItem('walletAddress');
      }
      else if (res != '') {
        this.walletAddress = res;
        console.log('this.walletAddress', this.walletAddress)
      }
    });
    this.web3Service.connected.subscribe((res: boolean) => {
      this.connected = res;
    })
    this.ConnectionCheck.checkConnectionStatus();
  }

  connectWallet() {
    this.ConnectionCheck.connectWallet()
  }

  disconnectWallet() {
    this.ConnectionCheck.disconnectWallet();
  }

  openDialog() {
    const element: any = document.getElementById("disConnect");
    if (element.style.display === "none" || element.style.display === undefined) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }


  copyToClipBoard() {
    this.clipboard.copy(this.walletAddress);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 700);
  }

  goToDashboard() {
    this.dashboard = true;
    this.dashboardLink?.nativeElement.classList.add('active');
    this.manage = false;
    this.bridge = false;
    this.market = false;
    this.router.navigateByUrl('/dashboard-wallet-connected')

  }
  goToManage() {
    this.manage = true;
    this.dashboard = false;
    this.bridge = false;
    this.market = false;
    this.router.navigateByUrl('/manage-wallet-connected')

  }
  goToBridge() {
    this.bridge = true;
    this.manage = false;
    this.dashboard = false;
    this.market = false;
    this.router.navigateByUrl('/bridge')
  }

  goToMarket() {
    this.market = true;
    this.router.navigateByUrl('/market')
  }
}