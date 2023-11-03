import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {AssetDetailComponent} from './asset-detail/asset-detail.component';
import { AssetsDetailRoutingModule } from './assets-detail-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AssetDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AssetsDetailRoutingModule
  ],exports:[AssetDetailComponent]
})
export class AssetsDetailModule { }
