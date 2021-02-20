import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ZoneService } from 'app/modules/zone/zone.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Zone } from '../zone.modal';

@Injectable({
  providedIn: 'root'
})
export class ZoneFormResolver implements Resolve<boolean> {
  zone: Zone;
  onZoneChanged: BehaviorSubject<Zone> = new BehaviorSubject(null);

  constructor(private zoneService: ZoneService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.zoneService.getZone(route.params.id).subscribe(prod => {
          this.zone = prod;
          this.onZoneChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
