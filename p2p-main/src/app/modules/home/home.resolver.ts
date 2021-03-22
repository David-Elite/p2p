import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SectionService } from 'src/app/shared/services/section/section.service';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {
  home: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private homeService: HomeService,
    private sectionService: SectionService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.homeService.getHome()
    .then(home => {
      if (home.section && home.section.length > 1) {
        home.section = home.section.sort ((a: any, b: any) => a.position - b.position);
        const promises: Promise<any>[] = [];
        home.section.forEach((sec: any) => {
          promises.push(this.sectionService.getSection(sec.id));
        });
        return Promise.all(promises).then(secs => {
          home.section = secs;
          this.home.next(home);
          return true;
        });
      } else {
        this.home.next(home);
        return true;
      }
    })
    .catch(err => false);
  }
}
