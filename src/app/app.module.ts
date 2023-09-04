import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruncateTextDirective } from './directives/truncate-text.directive';
import { WallletOverlayComponent } from './modules/wallet-overlay/walllet-overlay/walllet-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { ManageComponent } from './modules/manage/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    TruncateTextDirective,
    WallletOverlayComponent,
    DashboardComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
