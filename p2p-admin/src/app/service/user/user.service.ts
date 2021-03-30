import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  subscribe: any;
  on() {
    throw new Error('Method not implemented.');
  }

  user: BehaviorSubject<any> = new BehaviorSubject(null);
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  login(userName: string, password: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/admin-user/login`, { email: userName, password: password }).subscribe(result => {
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

  isLogin(): Promise<boolean> {
    const token = localStorage.getItem('token');
    console.log(token);
    const header = {
      'Authorization': `bearer ${token}`
    };
    return new Promise((res, rej) => {
      if (token) {
        this.httpClient.get<any>(`${environment.host}/admin-user/verify`, { headers: header }).subscribe(
          result => {
            if (result) {
              this.user.next(result);
              res(true);
            } else {
              rej(false);
            }
          },
          err => {
            console.log(err);
            rej();
          }
        );
      } else {
        rej();
      }

    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.user.next(null);
  }
}
