import { Component } from '@angular/core';
import { WriteContractsService } from 'src/app/services/write-contracts.service';
@Component({
  selector: 'app-assets-details',
  templateUrl: './assets-details.component.html',
  styleUrls: ['./assets-details.component.css']
})
export class AssetsDetailsComponent {
  currentTab: any = 'tab1';
  depositValue: any;
  borrowValue: any;

  constructor(private writeContractService: WriteContractsService) { }

  openTab(tabName: any) {
    this.currentTab = tabName;
  }

  depositAmount() {
    const depositValue =this.depositValue
    console.log('depositValue', depositValue);
    this.writeContractService.deposit(depositValue)
  }

  borrowAmount() {
    console.log('borrowValue', this.borrowValue)
  }
}
