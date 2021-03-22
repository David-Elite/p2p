import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CareerService } from './career.service';

@Injectable({
  providedIn: 'root'
})
export class CareerResolver implements Resolve<boolean> {
  jobs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private careerService: CareerService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.careerService.getJobs().then( jobs => this.jobs.next(jobs));
  }
}
