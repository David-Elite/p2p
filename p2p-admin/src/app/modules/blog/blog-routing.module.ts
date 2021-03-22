import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogFormResolver } from './blog-form/blog-form.resolver';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { ListBlogResolver } from './list-blog/list-blog.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-blog',
    pathMatch: 'full',
  },
  {
    path: 'list-blog',
    component: ListBlogComponent,
    resolve: {
      data: ListBlogResolver
    }
  },
  {
    path: 'blog-form/:id',
    component: BlogFormComponent,
    resolve: {
      data: BlogFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
