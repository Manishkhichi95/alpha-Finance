import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
connected: string |null ='false';
constructor(){
  this.connected = localStorage.getItem("connected");
  console.log('connected',this.connected,typeof(this.connected))
 }
}
