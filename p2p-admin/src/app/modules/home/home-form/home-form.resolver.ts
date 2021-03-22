import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HomeService } from 'app/modules/home/home.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Home } from '../home.modal';

@Injectable({
  providedIn: 'root'
})
export class HomeFormResolver implements Resolve<boolean> {
  home: Home;
  onHomeChanged: BehaviorSubject<Home> = new BehaviorSubject(null);

  constructor(private homeService: HomeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((res, rej) => {
      this.homeService.getHome().subscribe(home => {
        this.home = home;
        this.onHomeChanged.next(home);
        res(true);
      });
    });
  }
}
