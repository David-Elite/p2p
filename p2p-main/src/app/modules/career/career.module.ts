import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career/career.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


@NgModule({
  declarations: [
    CareerComponent,
    JobDetailComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
