import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<boolean> {
  packages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private searchService: SearchService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.searchService.getPackages().then(pck => {
      this.packages.next(pck);
      return true;
    })
    .catch(err => {
      return false;
    });
  }
}
