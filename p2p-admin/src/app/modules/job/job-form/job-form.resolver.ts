import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { JobService } from 'app/modules/job/job.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Job } from '../job.modal';

@Injectable({
  providedIn: 'root'
})
export class JobFormResolver implements Resolve<boolean> {
  job: Job;
  onJobChanged: BehaviorSubject<Job> = new BehaviorSubject(null);

  constructor(private jobService: JobService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.jobService.getJob(route.params.id).subscribe(prod => {
          console.log(route.params.id)
          this.job = prod;
          this.onJobChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
