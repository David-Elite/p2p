import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourPackageFormComponent } from './tour-package-form/tour-package-form.component';
import { TourPackageFormResolver } from './tour-package-form/tour-package-form.resolver';
import { ListTourPackageComponent } from './list-tour-package/list-tour-package.component';
import { ListTourPackageResolver } from './list-tour-package/list-tour-package.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-tour-package',
    pathMatch: 'full',
  },
  {
    path: 'list-tour-package',
    component: ListTourPackageComponent,
    resolve: {
      data: ListTourPackageResolver
    }
  },
  {
    path: 'tour-package-form/:id',
    component: TourPackageFormComponent,
    resolve: {
      data: TourPackageFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPackageRoutingModule { }
