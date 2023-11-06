import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateDirective } from '../directives/truncate.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from 'src/GraphQl/graphql.module';
import { HeadBannerComponent } from '../modules/head-banner/head-banner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [TruncateDirective, HeadBannerComponent],
  imports: [
    NgChartsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TruncateDirective,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    GraphQLModule,
    MatProgressSpinnerModule,
    HeadBannerComponent]
})
export class SharedModule { }