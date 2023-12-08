import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from 'src/GraphQl/graphql.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    GraphQLModule,
    NgChartsModule,
    HttpClientModule,
    TruncateDirective,
    HeadBannerComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }