import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { User } from './user.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(userId: string): Observable<User> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    console.log(userId);
    return this.httpClient.get<any>(`${environment.host}/user/${userId}`,{headers:header})
      .pipe<User>(map(c => {
        const cat: User = new User({
          id: c.id,
          userName: c.name,
          email: c.email,
          mobile: c.mobile,
          gender: c.gender,
          country: c.country,
          password: c.password,
          active: true
        });
        return cat;

      }));
  }


  getUsers(): Observable<User[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/user`,{headers:header})
      .pipe<User[]>(map(ca => ca.map(c => {
        const cat: User = new User({
          id: c.id,
          userName: c.name,
          email: c.email,
          password: c.password,
          mobile: c.mobile,
          gender: c.gender,
          country: c.country,
          active: true
        });
        return cat;

      })));
  }

  addUser(data: User): Promise<string> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/user`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        gendr: data.gender,
        country: data.country
      },
   {headers:header} ).subscribe(result => res(data.id))
    );
  }

  saveUser(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/user/${data.id}`,
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        gendr: data.gender,
        country: data.country
      },
      {
        headers:header
      }
    ).subscribe(result => res(data.id))
    );
  }

  deleteUser(userId: string): Promise<void> {
    return Promise.resolve();
  }

}
