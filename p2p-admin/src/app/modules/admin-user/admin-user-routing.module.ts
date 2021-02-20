import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminuserFormComponent } from './admin-user-form/admin-user-form.component';
import { AdminuserFormResolver } from './admin-user-form/admin-user-form.resolver';
import { ListAdminuserComponent } from './list-admin-user/list-admin-user.component';
import { ListAdminuserResolver } from './list-admin-user/list-admin-user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-admin-user',
    pathMatch: 'full',
  },
  {
    path: 'list-admin-user',
    component: ListAdminuserComponent,
    resolve: {
      data: ListAdminuserResolver
    }
  },
  {
    path: 'admin-user-form/:id',
    component: AdminuserFormComponent,
    resolve: {
      data: AdminuserFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminuserRoutingModule { }
