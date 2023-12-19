import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageRoutingModule } from './manage-routing.module';

@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    SharedModule,
  ]
})
export class ManageModule { }
