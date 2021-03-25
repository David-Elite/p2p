import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { User } from '../user.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ListUserResolver implements Resolve<boolean> {
  users: User[] = [];
  onUsersChanged: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(private userService: UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.userService.getUsers().subscribe( cats => {
        if (cats) {
          this.users = cats;
          this.onUsersChanged.next(cats);
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
