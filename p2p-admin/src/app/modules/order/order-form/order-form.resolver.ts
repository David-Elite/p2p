import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { OrderService } from 'app/modules/order/order.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Order } from '../order.modal';

@Injectable({
  providedIn: 'root'
})
export class OrderFormResolver implements Resolve<boolean> {
  order: Order;
  onOrderChanged: BehaviorSubject<Order> = new BehaviorSubject(null);

  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.orderService.getOrder(route.params.id).subscribe(prod => {
          this.order = prod;
          this.onOrderChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
