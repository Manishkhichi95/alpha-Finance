import { NgModule } from '@angular/core';
import { Web3Service } from './services/WEb3Service.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssetsDetailsComponent } from './modules/assets-details/assets-details/assets-details.component';
import { TruncateDirective } from './directives/truncate.directive';
import { MainModule } from './modules/main/main.module';
import { GraphQLModule } from '../GraphQl/graphql.module';
@NgModule({
  declarations: [
    AppComponent,
    // TruncateTextDirective,
    AssetsDetailsComponent,
    TruncateDirective,
  ],
  imports: [
    MainModule,
    BrowserModule,
    CommonModule,
    GraphQLModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    GraphQLModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
