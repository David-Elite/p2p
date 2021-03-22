import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getZones(): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/zone`).subscribe({
        next: (zones) => res(zones),
        error: (err) => rej(err),
        complete: () => console.log('Resolve')
      });
    });
  }

  getPackages(): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/packages`).subscribe({
        next: (zones) => res(zones),
        error: (err) => rej(err),
        complete: () => console.log('Resolve')
      });
    });
  }
}
