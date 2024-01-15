import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Web3Service } from 'src/app/services/WEb3Service.service';
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

  constructor(private clipboard: Clipboard,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private web3Service: Web3Service,
    private checkConnectStatus: CheckwalletConnectService, private route: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      const currentRoute = this.router.url;
      const element: any = document.getElementById(currentRoute);
      element.classList.add('active');
    });
    this.web3Service.walletAddress.subscribe((address: string) => {
      this.walletAddress = address;
      this.cdr.detectChanges();
    });
    this.web3Service.connected.subscribe((res: any) => {
      this.connected = res;
    });
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0 || !this.walletAddress && !this.connected) {
          this.disconnectWallet();
        } else
          if (accounts[0].toLowerCase() !== this.walletAddress.toLowerCase() && this.connected) {
            this.selectedAddress = accounts[0].toLowerCase();
            this.web3Service.walletAddress.next(this.selectedAddress);
            localStorage.setItem('walletAddress', this.selectedAddress);
            this.connected = true;
            this.web3Service.connected.next(this.connected);
          } else if (!this.connected) {
            this.disconnectWallet();
          }
      })
    }
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
    return this.checkConnectStatus.disconnectWallet();
  }

  connectWallet() {
    return this.checkConnectStatus.connectWallet();
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
        this.route.navigateByUrl(url);
        break;
      case '/dashboard-wallet-connected':
        this.route.navigateByUrl(url);
        break;
      case '/manage-wallet-connected':
        this.route.navigateByUrl(url);
        break;
      case '/bridge':
        this.route.navigateByUrl(url);
        break;
    }
  }
}