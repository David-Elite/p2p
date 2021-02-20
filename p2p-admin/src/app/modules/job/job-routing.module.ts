import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobFormComponent } from './job-form/job-form.component';
import { JobFormResolver } from './job-form/job-form.resolver';
import { ListJobComponent } from './list-job/list-job.component';
import { ListJobResolver } from './list-job/list-job.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-job',
    pathMatch: 'full',
  },
  {
    path: 'list-job',
    component: ListJobComponent,
    resolve: {
      data: ListJobResolver
    }
  },
  {
    path: 'job-form/:id',
    component: JobFormComponent,
    resolve: {
      data: JobFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
