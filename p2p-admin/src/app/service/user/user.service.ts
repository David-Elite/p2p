import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<any> = new BehaviorSubject(null);
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private fuseProgressBarService: FuseProgressBarService,
  ) {
  }

  login(userName: string, password: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/login`, {email: userName, password: password}).subscribe(result => {
        console.log(result);
        localStorage.setItem('token', result['token'].toString());
        this.user.next(result);
        res(result);
     
      },
      err => {
        console.log(err);
        rej(err);
      }
      );
    });
  }

  isLogin(): Promise<boolean>{
    const token = localStorage.getItem('token');
    console.log(token);
    const header = {
      'Authorization': `bearer ${token}`
    };
    return new Promise((res, rej) => {
      if (token) {
        this.httpClient.get<any>(`${this.host}/verify`, {headers: header}).subscribe(
          result => {
            console.log(result);
            console.log('In Result');
            res(true);
          },
          err => {
            console.log('its Errro');
            console.log(err);
            rej();
          }
        );
      } else {
        rej();
      }
      
    });
  }

  logout(): void{
    localStorage.removeItem('token');
    this.user.next(null);
  }
}
