import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainModule } from "./modules/main/main.module";
import { AuthGuard } from './auth.guard';
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    imports: [
        SharedModule,
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MainModule
    ]
})
export class AppModule { }