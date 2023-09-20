import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveOverviewRoutingModule } from './reserve-overview-routing.module';
import { ReserveOverviewComponent } from './reserve-overview/reserve-overview.component';


@NgModule({
  declarations: [
    ReserveOverviewComponent
  ],
  imports: [
    CommonModule,
    ReserveOverviewRoutingModule
  ]
})
export class ReserveOverviewModule { }
