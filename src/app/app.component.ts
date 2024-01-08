import { Component, OnInit} from '@angular/core';
import { CheckwalletConnectService } from './services/checkwallet-connect.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private checkConnectStatus:CheckwalletConnectService){ }
  ngOnInit(): void {
    this.checkConnectStatus.checkConnectionStatus();
  }
}