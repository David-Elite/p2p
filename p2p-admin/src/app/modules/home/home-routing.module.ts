import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeFormComponent } from './home-form/home-form.component';
import { HomeFormResolver } from './home-form/home-form.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeFormComponent,
    resolve: {
      data: HomeFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
