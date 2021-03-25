import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderFormResolver } from './order-form/order-form.resolver';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListOrderResolver } from './list-order/list-order.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-order',
    pathMatch: 'full',
  },
  {
    path: 'list-order',
    component: ListOrderComponent,
    resolve: {
      data: ListOrderResolver
    }
  },
  {
    path: 'order-form/:id',
    component: OrderFormComponent,
    resolve: {
      data: OrderFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
