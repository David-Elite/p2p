import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Zone } from './zone.modal';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  host = 'http://localhost:8080';
  constructor(

    private httpClient: HttpClient
  ) { }

  getZone(zoneId: string): Observable<Zone> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/zone/${zoneId}`,{headers:header})
      .pipe<Zone>(map(c => {
        const cat: Zone = new Zone({
          id: c.id,
          zoneType: c.zone_type,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          continent: c.continent,
          country: c.country,
          state: c.state,
          city: c.city,
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      }));
  }


  getZones(): Observable<Zone[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<{ id: any; zone_type: any; title: any; handle: any; tags: string; continent: any; country: string; state: string; city: string; images: string }[]>(`${environment.host}/zone`,{headers:header})
      .pipe<Zone[]>(map(ca => ca.map(c => {
        const cat: Zone = new Zone({
          id: c.id,
          zoneType: c.zone_type,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          continent: c.continent,
          country: c.country,
          state: c.state,
          city: c.city,
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      })));
  }

  addZone(data: Zone): Promise<string> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/zone`,
      {
        id: data.id,
        zoneType: data.zoneType,
        title: data.title,
        handle: data.handle,
        tags: data.tags.toString(),
        continent: data.continent,
        country: data.country,
        state: data.state,
        city: data.city,
      },{
        headers:header
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveZone(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/zone/${data.id}`,
      {
        id: data.id,
        zoneType: data.zoneType,
        title: data.title,
        handle: data.handle,
        tags: data.tags.toString(),
        continent: data.continent,
        country: data.country,
        state: data.state,
        city: data.city,
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deleteZone(zoneId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
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

      observables.push(this.httpClient.post(`${environment.host}/zone/image`, formData,{headers:header}),{headers:header});
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
      this.httpClient.delete(`${environment.host}/zone/images/${imageId}`,{headers:header})
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }
}
