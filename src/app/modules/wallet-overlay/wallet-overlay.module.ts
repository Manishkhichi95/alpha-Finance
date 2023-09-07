import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallletOverlayComponent } from './walllet-overlay/walllet-overlay.component';
import { WalletOverlayRoutingModule } from './wallet-overlay-routing.module';


@NgModule({
  declarations: [WallletOverlayComponent],
  imports: [
    CommonModule,
    WalletOverlayRoutingModule
  ]
})
export class WalletOverlayModule { }
