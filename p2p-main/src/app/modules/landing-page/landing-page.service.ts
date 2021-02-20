import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LandingPage } from './landing-page.model';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  host = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) { }

  getLandingPageByHandle(handle: string): Promise<LandingPage> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${this.host}/landing_page/handle/${handle}`)
      .subscribe( result => {
        res(result);
      },
      err => rej(err));
    });
  }

}
