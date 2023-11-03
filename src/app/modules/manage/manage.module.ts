import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    SharedModule,
  ]
})
export class ManageModule { }
