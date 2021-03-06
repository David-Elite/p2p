import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Page } from './page.modal';

import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  host = 'http://localhost:8080';
  constructor(

    private httpClient: HttpClient
  ) { }

  getPage(pageId: string): Observable<Page> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/page/${pageId}`,{headers:header})
      .pipe<Page>(map(c => {
        const cat: Page = new Page({
          id: c.id,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          content: c.content,
          metaTitle: c.meta_title,
          metaDescription: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      }));
  }


  getPages(): Observable<Page[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/page`,{headers:header})
      .pipe<Page[]>(map(ca => ca.map(c => {
        const cat: Page = new Page({
          id: c.id,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          content: c.content,
          author: c.author,
          date: c.date,
          metaTitle: c.meta_title,
          metaDescription: c.meta_description,
          metaKeywords: c.meta_keywords ? c.meta_keywords.split(',') : [],
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      })));
  }

  addPage(data: Page): Promise<string> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/page`, data,{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  savePage(id: string, data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/page/${id}`, data,{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deletePage(pageId: string): Promise<void> {
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
      // formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${environment.host}/image/page/${id}`, formData,{headers:header}));
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
      this.httpClient.delete(`${environment.host}/image/page/${imageId}`,{headers:header})
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }

  addLink(id: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }

    
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/link/page/${id}`, formData,{headers:header}).pipe(take(1))
      .subscribe(
        msc => {
          res(msc);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editLink(id: string, linkId: string, data: any, icon: File): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/link/page/${id}/${linkId}`, formData,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(id: string, linkId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/link/${linkId}`,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
