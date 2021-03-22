import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TourPackage } from './tour-package.model';
import { TourPackageService } from './tour-package.service';

@Injectable({
  providedIn: 'root'
})
export class TourPackageResolver implements Resolve<boolean> {
  package = new BehaviorSubject<any>(null);
  constructor(private tourPackageService: TourPackageService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.tourPackageService.getTourPackageByHandle(route.params.handle).then(pkg => {
      if (pkg) {
        console.log(pkg);
        this.package.next(pkg);
        return true;
      } else {
        return false;
      }
    });
  }
}
