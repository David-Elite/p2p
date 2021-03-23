import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Adminuser } from './admin-user.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminuserService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAdminuser(adminuserId: string): Observable<Adminuser> {
    return this.httpClient.get<{ id: any; name: string; email: string; password: string; role: string }>(`${this.host}/admin-user/${adminuserId}`)
      .pipe<Adminuser>(map(c => {
        const cat: Adminuser = new Adminuser({
          id: c.id,
          userName: c.name,
          email: c.email,
          password: c.password,
          role: c.role,
          active: true
        });
        return cat;

      }));
  }


  getAdminusers(): Observable<Adminuser[]> {
    return this.httpClient
      .get<{ id: any; name: string; email: string; password: string; role: string }[]>(`${this.host}/admin-user`)
      .pipe<Adminuser[]>(map(ca => ca.map(c => {
        const cat: Adminuser = new Adminuser({
          id: c.id,
          userName: c.name,
          email: c.email,
          password: c.password,
          role: c.role,
          active: true
        });
        return cat;

      })));
  }

  addAdminuser(data: Adminuser): Promise<string> {
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/admin-user`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: data.role
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveAdminuser(data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/admin-user/${data.id}`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: data.role
      }
    ).subscribe(result => res(data.id))
    );
  }

  deleteAdminuser(adminuserId: string): Promise<void> {
    return Promise.resolve();
  }

}
