import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LandingPage } from '../landing-page.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LandingPageService } from '../landing-page.service';

@Injectable({
  providedIn: 'root'
})
export class ListLandingPageResolver implements Resolve<boolean> {
  landingPages: any[] = [];
  onLandingPagesChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private landingPageService: LandingPageService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.landingPageService.getLandingPages().subscribe( landingPage => {
        console.log(landingPage);
        if (landingPage) {
          this.landingPages = landingPage;
          this.onLandingPagesChanged.next(landingPage);
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
