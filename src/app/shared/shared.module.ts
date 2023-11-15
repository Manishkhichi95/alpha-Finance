import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from 'src/GraphQl/graphql.module';
import { TruncateDirective } from '../directives/truncate.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeadBannerComponent } from '../modules/head-banner/head-banner.component';

@NgModule({
  declarations: [TruncateDirective, HeadBannerComponent],
  imports: [
    FormsModule,
    CommonModule,
    GraphQLModule,
    NgChartsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    GraphQLModule,
    NgChartsModule,
    HttpClientModule,
    TruncateDirective,
    HeadBannerComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }