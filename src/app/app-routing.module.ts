import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'market',
    pathMatch: 'full'
  },
  {
    path: 'market',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'dashboard-wallet-connected',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'manage-wallet-connected',
    loadChildren: () => import('./modules/manage/manage.module').then(m => m.ManageModule)
  },
  {
    path: 'bridge',
    loadChildren: () => import('./modules/bridge/bridge.module').then(m => m.BridgeModule)
  },
  {
    path: 'details', canActivate: [AuthGuard],
    loadChildren: () => import('./modules/assets-detail/assets-detail.module').then(m => m.AssetsDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }