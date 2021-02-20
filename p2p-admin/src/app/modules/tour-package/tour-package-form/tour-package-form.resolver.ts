import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { TourPackageService } from 'app/modules/tour-package/tour-package.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TourPackage } from '../tour-package.modal';

@Injectable({
  providedIn: 'root'
})
export class TourPackageFormResolver implements Resolve<boolean> {
  tourPackage: TourPackage;
  onTourPackageChanged: BehaviorSubject<TourPackage> = new BehaviorSubject(null);

  constructor(private tourPackageService: TourPackageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.tourPackageService.getTourPackage(route.params.id).subscribe(prod => {
          this.tourPackage = prod;
          this.onTourPackageChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
