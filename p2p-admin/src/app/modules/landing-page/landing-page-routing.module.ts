import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageFormComponent } from './landing-page-form/landing-page-form.component';
import { LandingPageFormResolver } from './landing-page-form/landing-page-form.resolver';
import { ListLandingPageComponent } from './list-landing-page/list-landing-page.component';
import { ListLandingPageResolver } from './list-landing-page/list-landing-page.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-landing-page',
    pathMatch: 'full',
  },
  {
    path: 'list-landing-page',
    component: ListLandingPageComponent,
    resolve: {
      data: ListLandingPageResolver
    }
  },
  {
    path: 'landing-page-form/:id',
    component: LandingPageFormComponent,
    resolve: {
      data: LandingPageFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
