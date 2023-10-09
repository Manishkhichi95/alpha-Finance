import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from '../../../../GraphQl/graphql.operations';
import { readContractsService } from 'src/app/services/readContracts.service';
import { HttpClient } from '@angular/common/http';
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
  RAY = Math.pow(10, 27);
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
  variableBorrowAPR: any = [];
  stableBorrowAPR: any;
  utilizationRateArr: any = [];
  variableBorrowAPRArr: any = [];
  BorrowAPRdateArr: any = [];
  data: any;
  posts: any;
  ReserveData: any = [];
  PoolAddressesProvider_AaveAddress: any;
  depositAPR: any;
  supplyAPRarr: any = [];
  utilizationRate: String = '';
  constructor(private readContractsService: readContractsService, private apollo: Apollo, private https: HttpClient) {
    this.selectedReserve = this.readContractsService.selectedReserve;
    this.PoolAddressesProvider_AaveAddress = this.readContractsService.PoolAddressesProvider_AaveAddress
    this.selectedReserveContract = this.readContractsService.selectedReserveContract;
    console.log(this.selectedReserve);
    this.apollo
      .watchQuery({ query: GET_POSTS })
      .valueChanges.subscribe((data: any) => {
        data.data.reserveParamsHistoryItems.forEach((element: any) => {
          if (element.reserve.underlyingAsset === this.selectedReserve.address.toLowerCase()) {
            this.ReserveData.push({ element });
          }
        });
        this.ReserveData.forEach((ele: any) => {
          ele.variableBorrowAPR = (Number(ele.element.variableBorrowRate) / this.RAY) * 100;
          ele.supplyAPR = (Number(ele.element.liquidityRate) / this.RAY) * 100;
          const date = new Date(ele.element.timestamp * 1000);
          const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          ele.timestamp = months[date.getMonth()] + date.getDate();
          this.BorrowAPRdateArr.push(ele.timestamp);
          this.variableBorrowAPRArr.push(ele.variableBorrowAPR);
          this.supplyAPRarr.push(ele.supplyAPR);
          this.utilizationRateArr.push(ele.element.utilizationRate)
        })
      });
    this.getReserveConfiguration();
  }

  brrwChart: any;
  borrowChart() {
    this.brrwChart = new Chart("borrowChart", {
      type: 'line',
      data: {
        labels: this.BorrowAPRdateArr,
        datasets: [
          {
            label: "variableBorrowAPR",
            data: this.variableBorrowAPRArr,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)',
          }
        ]
      },
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
          ,
        }
      }
    });
  }

  spplyChart: any;
  supplyChart() {
    this.spplyChart = new Chart("spplyChart", {
      type: 'line',
      data: {
        labels: this.BorrowAPRdateArr,
        datasets: [
          {
            label: "supplyAPR",
            data: this.supplyAPRarr,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)',
          }
        ]
      },
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
          ,
        }
      }
    });
  }

  intrstrateChart: any;
  interestRateChart() {
    this.spplyChart = new Chart("intrstrateChart", {
      type: 'line',
      data: {
        labels: this.variableBorrowAPRArr,
        datasets: [
          {
            label: "UtilizationRate",
            data: this.utilizationRateArr,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)',
          }
        ]
      },
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
          ,
        }
      }
    });
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
    this.utilizationRate = ((this.totalBorrows * 100) / this.totalSupply).toFixed(2);
    console.log(this.ReserveData)
    this.borrowChart();
    this.supplyChart();
    this.interestRateChart();
  }
}