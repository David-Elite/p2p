import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { TourPackage } from '../tour-package.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TourPackageService } from '../tour-package.service';

@Injectable({
  providedIn: 'root'
})
export class ListTourPackageResolver implements Resolve<boolean> {
  tourPackages: any[] = [];
  onTourPackagesChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private tourPackageService: TourPackageService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.tourPackageService.getTourPackages().subscribe( tourPackage => {
        console.log(tourPackage);
        if (tourPackage) {
          this.tourPackages = tourPackage;
          this.onTourPackagesChanged.next(tourPackage);
        }
        res(true);
        // return true;
      },
      err => {
        console.log(err);
        res(false);
      });
    });
  }
}
