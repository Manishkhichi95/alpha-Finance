import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from 'src/GraphQl/graphql.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TruncateDirective } from '../directives/truncate.directive';
import { NavbarComponent } from '../modules/navbar/navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeadBannerComponent } from '../modules/head-banner/head-banner.component';
@NgModule({
  declarations: [TruncateDirective, HeadBannerComponent,NavbarComponent],
  imports: [
    FormsModule,
    CommonModule,
    GraphQLModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    ToastrModule,
    GraphQLModule,
    NgChartsModule,
    NavbarComponent,
    HttpClientModule,
    TruncateDirective,
    HeadBannerComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }