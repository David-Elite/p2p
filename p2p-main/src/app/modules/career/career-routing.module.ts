import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerComponent } from './career/career.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CareerComponent
  },
  {
    path: ':handle',
    component: JobDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
