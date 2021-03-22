import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { PageService } from 'app/modules/page/page.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Page } from '../page.modal';

@Injectable({
  providedIn: 'root'
})
export class PageFormResolver implements Resolve<boolean> {
  page: Page;
  onPageChanged: BehaviorSubject<Page> = new BehaviorSubject(null);

  constructor(private pageService: PageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.pageService.getPage(route.params.id).subscribe(prod => {
          this.page = prod;
          this.onPageChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
