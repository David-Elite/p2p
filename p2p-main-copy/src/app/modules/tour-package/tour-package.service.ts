import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourPackage } from './tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  host = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) {
   }

  getCompleteTourPackages(): Observable<any>{
    return this.httpClient
      .get<any[]>(`${environment.host}/tour_packages`)
  }

  getTourPackageByHandle(handle: string): Promise<TourPackage> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/tour_packages/handle/${handle}`)
      .subscribe( result => {
        console.log(result);
        res(result);
      },
      err => rej(err));
    });
  }

}