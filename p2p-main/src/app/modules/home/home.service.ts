import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getHome(): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/home`).subscribe(
        home => res(home),
        err => rej(err));
    });
  }
}
