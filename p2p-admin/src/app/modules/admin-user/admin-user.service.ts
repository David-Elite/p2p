import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Adminuser } from './admin-user.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminuserService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAdminuser(adminuserId: string): Observable<Adminuser> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<{ id: any; name: string; email: string; password: string; role: string }>(`${environment.host}/admin-user/${adminuserId}`,{headers:header})
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
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<{ id: any; name: string; email: string; password: string; role: string }[]>(`${environment.host}/admin-user`,{headers:header})
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
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/admin-user`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: data.role
      },{headers:header}
    ).subscribe(result => res(data.id))
   , );
  }

  saveAdminuser(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/admin-user/${data.id}`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: data.role
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deleteAdminuser(adminuserId: string): Promise<void> {
    return Promise.resolve();
  }

}
