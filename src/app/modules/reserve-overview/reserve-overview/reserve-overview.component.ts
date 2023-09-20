import { Component } from '@angular/core';
import { readContractsService } from 'src/app/services/readContracts.service';
@Component({
  selector: 'app-reserve-overview',
  templateUrl: './reserve-overview.component.html',
  styleUrls: ['./reserve-overview.component.css']
})
export class ReserveOverviewComponent {
  selectedReserve: any;
  totalSupply: any;
  totalBorrows: any;
  APY: any;
  LiquidationThreshold: any;
  liquidationPenalty: any;
  maxLTV: any;
  borrowAPR: any;
  utilisationRate: any;
  selectedReserveContract: any;
  availableLiquidity: any;
  variableAPY: any;
  stableAPY: any;
  poolDataProviderContract: any;
  ReserveConfigurationData: any;
  totalSupplyVal: any;
  SupplyCap: any;
  totalAtoken: any;
  supplyAPR: any;
  BorrowCap: any;
  variableBorrowAPY: any;
  stableBorrowAPY: any;
  variableBorrowAPR: any;
  stableBorrowAPR: any;
  utilizationRate: any;
  constructor(private readContractsService: readContractsService) {
    this.selectedReserve = this.readContractsService.selectedReserve;
    this.selectedReserveContract = this.readContractsService.selectedReserveContract;
    console.log(this.selectedReserve)
    this.getReserveConfiguration();
  }

  async getReserveConfiguration() {
    this.supplyAPR = ((Number(this.selectedReserve.depositAPR) * Math.pow(10, 2)) * 100000).toFixed(2);
    this.SupplyCap = Number(this.selectedReserve.details['supplyCap']) / 1000000;
    this.totalAtoken = this.selectedReserve.totalAToken;
    this.poolDataProviderContract = this.readContractsService.poolDataProviderContract;
    this.ReserveConfigurationData = await this.poolDataProviderContract.methods.getReserveConfigurationData(this.selectedReserve.address).call();
    this.totalSupplyVal = await this.selectedReserveContract.methods.totalSupply().call();
    this.totalSupply = (Number(this.totalSupplyVal) / Math.pow(10, 20)).toFixed(2);
    this.totalBorrows = Number(this.selectedReserve.totalBorrows);
    this.APY = this.selectedReserve.depositAPY;
    this.liquidationPenalty = (Number(this.ReserveConfigurationData['liquidationBonus']) / Math.pow(10, 2)).toFixed(2);
    this.borrowAPR = (Number(this.selectedReserve.variableBorrowAPR) * 10000000).toFixed(2);
    this.variableAPY = this.selectedReserve.stableBorrowAPY;
    this.stableAPY = this.selectedReserve.stableBorrowAPY;
    this.utilisationRate = (Number(this.selectedReserve.details['liquidityRate']) / Math.pow(10, 19)).toFixed(2);
    this.LiquidationThreshold = (Number(this.ReserveConfigurationData['liquidationThreshold']) / 100).toFixed(2);
    this.availableLiquidity = ((Number(this.selectedReserve.details['availableLiquidity'])) / Math.pow(10, 18)).toFixed(2);
    this.maxLTV = (Number(this.selectedReserve.details['eModeLtv']) / 100).toFixed(2);
    this.BorrowCap = this.selectedReserve.details['borrowCap'];
    this.totalBorrows = this.selectedReserve.totalBorrows;
    this.variableBorrowAPY = this.selectedReserve.variableBorrowAPY;
    this.stableBorrowAPY = this.selectedReserve.stableBorrowAPY;
    this.variableBorrowAPR = this.selectedReserve.variableBorrowAPR,
    this.stableBorrowAPR = this.selectedReserve.stableBorrowAPR;
    this.utilizationRate = ((this.totalBorrows * 100) / this.totalSupply).toFixed(2);
  }
}