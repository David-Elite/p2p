import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourPackageComponent } from './tour-package.component';

const routes: Routes = [
  {
    path: '',
    component: TourPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPackageRoutingModule { }
