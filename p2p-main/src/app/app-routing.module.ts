import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerResolver } from './modules/career/career.resolver';
import { HomeResolver } from './modules/home/home.resolver';
import { PageResolver } from './modules/page/page.resolver';
import { SearchResolver } from './modules/search/search.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    resolve: {
      data: HomeResolver
    }
  },
  {
    path: 'career',
    loadChildren: () => import('./modules/career/career.module').then(m => m.CareerModule),
    resolve: {
      data: CareerResolver
    }
  },
  {
    path: 'page/:handle',
    loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule),
    resolve: {
      data: PageResolver
    }
  },
  {
    path: 'packages',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
    resolve: {
      data: SearchResolver
    }
  },
  {
    path: 'blogs',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
