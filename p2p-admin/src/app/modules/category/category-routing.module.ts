import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryFormResolver } from './category-form/category-form.resolver';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListCategoryResolver } from './list-category/list-category.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-category',
    pathMatch: 'full',
  },
  {
    path: 'list-category',
    component: ListCategoryComponent,
    resolve: {
      data: ListCategoryResolver
    }
  },
  {
    path: 'category-form/:id',
    component: CategoryFormComponent,
    resolve: {
      data: CategoryFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
