import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveOverviewComponent } from './reserve-overview/reserve-overview.component';

const routes: Routes = [{
  path: '', component: ReserveOverviewComponent, pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveOverviewRoutingModule { }
