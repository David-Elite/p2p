import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Zone } from '../zone.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ZoneService } from '../zone.service';

@Injectable({
  providedIn: 'root'
})
export class ListZoneResolver implements Resolve<boolean> {
  zones: Zone[] = [];
  onZonesChanged: BehaviorSubject<Zone[]> = new BehaviorSubject<Zone[]>([]);
  constructor(private zoneService: ZoneService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.zoneService.getZones().subscribe( zone => {
        console.log(zone);
        if (zone) {
          this.zones = zone;
          this.onZonesChanged.next(zone);
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
