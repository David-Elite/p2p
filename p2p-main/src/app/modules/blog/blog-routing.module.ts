import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogListResolver } from './blog-list/blog-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
    resolve: {
      data: BlogListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
