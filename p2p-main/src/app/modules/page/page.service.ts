import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPage(handle: string): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/page/handle/${handle}`).pipe(take(1))
        .subscribe({
          next: r => {
            res(r);
          },
          error: e => {
            rej(e);
          }
        })
    })
  }
}
