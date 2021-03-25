import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Order } from './order.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getOrder(orderId: string): Observable<Order> {
    return this.httpClient.get<any>(`${this.host}/order/${orderId}`)
      .pipe<Order>(map(c => {
        const cat: Order = new Order({
          id: c.id,
          referenceId: c.reference_id,
          orderDate: c.order_date,
          customerName: c.customer_name,
          customerId: c.customer_id,
          adults: c.adults,
          childrens: c.childrens,
          active: true
        });
        return cat;

      }));
  }


  getOrders(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/order`)
      .pipe<any[]>(map(ca => ca.map(c => {
        const rev = {
          id: c.id,
          referenceId: c.reference_id,
          orderDate: c.order_date,
          customerName: c.customer_name,
          customerId: c.customer_id,
          adults: c.adults,
          childrens: c.childrens,
          active: true
        };
        return rev;

      })));
  }

  getPackagesForOrder(): Promise<any> {
    return new Promise((res, rej) => this.httpClient.get(`${this.host}/order/packages`)
      .subscribe(result => res(result),
                  err => rej(err))
    );
  }

  addOrder(data: Order, img: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('orderDate', data.orderDate.toString());
    formData.append('customerName', data.customerName);
    formData.append('customerId', data.customerId);
    formData.append('adults', data.adults.toString());
    formData.append('childens', data.childrens.toString());

    return new Promise((res, rej) => this.httpClient.post(`${this.host}/order`, formData)
      .subscribe(result => {
        res();
      },
      err => rej(err))
    );

  }

  saveOrder(data: any, img: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('orderDate', data.orderDate.toString());
    formData.append('customerName', data.customerName);
    formData.append('customerId', data.customerId);
    formData.append('adults', data.adults.toString());
    formData.append('childens', data.childrens.toString());

    return new Promise((res, rej) => this.httpClient.put(`${this.host}/order/${data.id}`,
      formData
    ).subscribe(result => res(data.id))
    );
  }

  deleteOrder(orderId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {

    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/order/image`, formData));
    }
    return forkJoin(observables).toPromise();
  }
  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/order/images/${imageId}`)
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }
}
