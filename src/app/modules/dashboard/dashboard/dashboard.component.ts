import { Component } from '@angular/core';
import { Web3Service } from 'src/app/services/WEb3Service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
connected: boolean = false;
constructor(private web3Service:Web3Service){
  this.web3Service.connected.subscribe((connected: boolean) => {
    this.connected = connected;
  })
  console.log(this.connected)
 }
}
