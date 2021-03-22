import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFormComponent } from './page-form/page-form.component';
import { PageFormResolver } from './page-form/page-form.resolver';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPageResolver } from './list-page/list-page.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-page',
    pathMatch: 'full',
  },
  {
    path: 'list-page',
    component: ListPageComponent,
    resolve: {
      data: ListPageResolver
    }
  },
  {
    path: 'page-form/:id',
    component: PageFormComponent,
    resolve: {
      data: PageFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
