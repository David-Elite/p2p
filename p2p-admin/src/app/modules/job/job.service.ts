import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Job } from './job.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getJob(jobId: string): Observable<Job> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/jobs/${jobId}`,{headers:header})
      .pipe<Job>(map(c => {
        const cat: Job = new Job({
          id: c.id,
          title: c.job_title,
          desc: c.job_desc,
          overview: c.job_overview,
          rnr: c.job_rnr,
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      }));
  }


  getJobs(): Observable<Job[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/jobs`,{headers:header})
      .pipe<Job[]>(map(ca => ca.map(c => {
        const cat: Job = new Job({
          id: c.id,
          title: c.job_title,
          desc: c.job_desc,
          overview: c.job_overview,
          rnr: c.job_rnr,
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      })));
  }

  addJob(data: Job): Promise<string> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/jobs`,
      {
        id: data.id,
        title: data.title,
        desc: data.desc,
        overview: data.overview,
        rnr: data.rnr
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  saveJob(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/jobs/${data.id}`,
      {
        id: data.id,
        title: data.title,
        desc: data.desc,
        overview: data.overview,
        rnr: data.rnr
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deleteJob(jobId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${environment.host}/jobs/image`, formData,{headers:header}));
    }
    return forkJoin(observables).toPromise();
  }

  removeImage(id: string, imageId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/jobs/images${imageId}`,{headers:header})
        .subscribe(
          () => res(),
          err => console.log(err)
        );
    });
  }
}
