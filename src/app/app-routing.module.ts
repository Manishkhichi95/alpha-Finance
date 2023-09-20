import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'reserve-overview',
    loadChildren: () => import('./modules/reserve-overview/reserve-overview.module').then(m => m.ReserveOverviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }