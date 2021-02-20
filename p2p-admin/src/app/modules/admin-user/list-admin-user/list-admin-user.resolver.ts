import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Adminuser } from '../admin-user.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AdminuserService } from '../admin-user.service';

@Injectable({
  providedIn: 'root'
})
export class ListAdminuserResolver implements Resolve<boolean> {
  adminusers: Adminuser[] = [];
  onAdminusersChanged: BehaviorSubject<Adminuser[]> = new BehaviorSubject<Adminuser[]>([]);
  constructor(private adminuserService: AdminuserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.adminuserService.getAdminusers().subscribe( cats => {
        console.log(cats);
        if (cats) {
          this.adminusers = cats;
          this.onAdminusersChanged.next(cats);
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
