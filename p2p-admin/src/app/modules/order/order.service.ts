import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Order } from './order.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getOrder(orderId: string): Observable<Order> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/order/${orderId}`,{headers:header})
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
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/order`,{headers:header})
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
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.get(`${environment.host}/order/packages`,{headers:header})
      .subscribe(result => res(result),
                  err => rej(err))
    );
  }

  addOrder(data: Order, img: File): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('orderDate', data.orderDate.toString());
    formData.append('customerName', data.customerName);
    formData.append('customerId', data.customerId);
    formData.append('adults', data.adults.toString());
    formData.append('childens', data.childrens.toString());

    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/order`, formData,{headers:header})
      .subscribe(result => {
        res();
      },
      err => rej(err))
    );

  }

  saveOrder(data: any, img: File): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('file', img, img.name);
    formData.append('referenceId', data.referenceId);
    formData.append('orderDate', data.orderDate.toString());
    formData.append('customerName', data.customerName);
    formData.append('customerId', data.customerId);
    formData.append('adults', data.adults.toString());
    formData.append('childens', data.childrens.toString());

    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/order/${data.id}`,
      formData,{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deleteOrder(orderId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }

    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${environment.host}/order/image`, formData,{headers:header}));
    }
    return forkJoin(observables).toPromise();
  }
  removeImage(id: string, imageId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/order/images/${imageId}`,{headers:header})
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }
}
