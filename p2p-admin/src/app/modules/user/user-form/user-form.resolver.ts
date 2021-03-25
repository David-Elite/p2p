import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from 'app/modules/user/user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserFormResolver implements Resolve<boolean> {
  user: User;
  onUserChanged: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.userService.getUser(route.params.id).subscribe(prod => {
          this.user = prod;
          this.onUserChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
