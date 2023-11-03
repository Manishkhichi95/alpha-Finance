import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    BridgeComponent
  ],
  imports: [
    CommonModule,
    BridgeRoutingModule,
    SharedModule
  ]
})
export class BridgeModule { }