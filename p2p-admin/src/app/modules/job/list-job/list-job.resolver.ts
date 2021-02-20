import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Job } from '../job.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JobService } from '../job.service';

@Injectable({
  providedIn: 'root'
})
export class ListJobResolver implements Resolve<boolean> {
  jobs: Job[] = [];
  onJobsChanged: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  constructor(private jobService: JobService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.jobService.getJobs().subscribe( cats => {
        console.log(cats);
        if (cats) {
          this.jobs = cats;
          this.onJobsChanged.next(cats);
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
