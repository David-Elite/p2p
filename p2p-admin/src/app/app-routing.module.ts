import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './guard/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'tour-package',
    loadChildren: () => import('./modules/tour-package/tour-package.module').then(m => m.TourPackageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'zone',
    loadChildren: () => import('./modules/zone/zone.module').then(m => m.ZoneModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'page',
    loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'review',
    loadChildren: () => import('./modules/review/review.module').then(m => m.ReviewModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./modules/job/job.module').then(m => m.JobModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-user',
    loadChildren: () => import('./modules/admin-user/admin-user.module').then(m => m.AdminuserModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
