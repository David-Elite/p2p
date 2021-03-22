import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<any> {
  page: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private pageService: PageService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const handle = route.params.handle;
    return this.pageService.getPage(handle).then( pg => {
      console.log(pg);
      this.page.next(pg);
      return true;
    });
  }
}
