import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AdminuserService } from 'app/modules/admin-user/admin-user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Adminuser } from '../admin-user.modal';

@Injectable({
  providedIn: 'root'
})
export class AdminuserFormResolver implements Resolve<boolean> {
  adminuser: Adminuser;
  onAdminuserChanged: BehaviorSubject<Adminuser> = new BehaviorSubject(null);

  constructor(private adminuserService: AdminuserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.adminuserService.getAdminuser(route.params.id).subscribe(prod => {
          this.adminuser = prod;
          this.onAdminuserChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
