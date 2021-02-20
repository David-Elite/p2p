import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LandingPageService } from 'app/modules/landing-page/landing-page.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { LandingPage } from '../landing-page.modal';

@Injectable({
  providedIn: 'root'
})
export class LandingPageFormResolver implements Resolve<boolean> {
  landingPage: LandingPage;
  onLandingPageChanged: BehaviorSubject<LandingPage> = new BehaviorSubject(null);

  constructor(private landingPageService: LandingPageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.landingPageService.getLandingPage(route.params.id).subscribe(prod => {
          this.landingPage = prod;
          this.onLandingPageChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
