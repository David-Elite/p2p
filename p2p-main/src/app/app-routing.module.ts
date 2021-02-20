import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourPackageResolver } from './modules/tour-package/tour-package.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'landing-page/:handle',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'package/:handle',
    loadChildren: () => import('./modules/tour-package/tour-package.module').then(m => m.TourPackageModule),
    resolve: { res: TourPackageResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
