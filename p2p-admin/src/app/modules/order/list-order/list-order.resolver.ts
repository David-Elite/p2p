import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Order } from '../order.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderService } from '../order.service';

@Injectable({
  providedIn: 'root'
})
export class ListOrderResolver implements Resolve<boolean> {
  orders: Order[] = [];
  onOrdersChanged: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  constructor(private orderService: OrderService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.orderService.getOrders().subscribe( order => {
        console.log(order);
        if (order) {
          this.orders = order;
          this.onOrdersChanged.next(order);
        }
        res(true);
        // return true;
      },
      err => {
        console.log(err);
        res(false);
      });
    });
  }
}
