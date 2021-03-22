import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Page } from '../page.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageService } from '../page.service';

@Injectable({
  providedIn: 'root'
})
export class ListPageResolver implements Resolve<boolean> {
  pages: Page[] = [];
  onPagesChanged: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>([]);
  constructor(private pageService: PageService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.pageService.getPages().subscribe( page => {
        console.log(page);
        if (page) {
          this.pages = page;
          this.onPagesChanged.next(page);
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
