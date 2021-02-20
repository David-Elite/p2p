import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Zone } from './zone.modal';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  host = 'http://localhost:8080';
  constructor(

    private httpClient: HttpClient
  ) { }

  getZone(zoneId: string): Observable<Zone> {
    return this.httpClient.get<any>(`${this.host}/zone/${zoneId}`)
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
    return this.httpClient
      .get<{ id: any; zone_type: any; title: any; handle: any; tags: string; continent: any; country: string; state: string; city: string; images: string }[]>(`${this.host}/zone`)
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
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/zone`,
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
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveZone(data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/zone/${data.id}`,
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
      }
    ).subscribe(result => res(data.id))
    );
  }

  deleteZone(zoneId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {

    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/zone/image`, formData));
    }
    return forkJoin(observables).toPromise();
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/zone/images/${imageId}`)
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }
}
