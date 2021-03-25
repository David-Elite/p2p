import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormResolver } from './user-form/user-form.resolver';
import { ListUserComponent } from './list-user/list-user.component';
import { ListUserResolver } from './list-user/list-user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-user',
    pathMatch: 'full',
  },
  {
    path: 'list-user',
    component: ListUserComponent,
    resolve: {
      data: ListUserResolver
    }
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent,
    resolve: {
      data: UserFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
