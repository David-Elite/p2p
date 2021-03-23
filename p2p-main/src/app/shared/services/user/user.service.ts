import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private socialAuthService: SocialAuthService
  ) { }

  login(email: string, password: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/login`, { email, password }).subscribe(result => {
        const response = result as any;
        localStorage.setItem('token', response.token.toString());
        this.user.next(response);
        res(response);
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
        this.httpClient.get<any>(`${environment.host}/verify`, { headers: header }).subscribe(
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

  logout(): void {
    localStorage.removeItem('token');
    this.user.next(null);
  }

  signup(name: string, email: string, mobile: string, password: string, confirmPass: string) {
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/register`, { name, email, mobile, password, confirmPass }).pipe(take(1))
        .subscribe(result => {
          console.log('Aaya');
          const response = result as any;
          localStorage.setItem('token', response.token.toString());
          this.user.next(response);
          res(response);
        },
          err => {
            console.log(err);
            rej(err);
          });
    });
  }

  googleSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
    });
  }
}
