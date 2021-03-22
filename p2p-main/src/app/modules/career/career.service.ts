import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getJobs(): Promise<any[]> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/jobs`).pipe(take(1)).subscribe(
        {
          next: (jobs) => {
            res(jobs as any[]);
          },
          error: (err) => {
            rej(err);
          }
        }
      );
    });
  }
}
