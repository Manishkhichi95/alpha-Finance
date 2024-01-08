import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from "./modules/main/main.module";
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    imports: [
        MainModule,
        CommonModule,
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ]
})
export class AppModule { }