import { Component, OnInit } from '@angular/core';
import { CheckwalletConnectService } from './services/checkwallet-connect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  balance: number = 0;
  connected: boolean = false;
  walletAddress: any;
  selectedAddress: string | undefined;
  copied: boolean = false;

  constructor(private ConnectionCheck : CheckwalletConnectService) {
    this.walletAddress = localStorage.getItem('walletAddress');
  }

  ngOnInit() {
    this.ConnectionCheck.checkConnectionStatus();
  }
}