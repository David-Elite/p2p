import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Home } from './home.modal';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getHome(): Observable<Home> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<any>(`${environment.host}/home`,{headers:header})
      .pipe<Home>(map(c => {
        console.log(c);
        const cat: Home = new Home({
          metaTitle: c.title,
          metaDesc: c.description,
          metaKeywords: c.keywords ? c.keywords.split(',') : [],
          sliderImages: c.slider_images ? c.slider_images : [],
          sliderLinks: c.slider_links ? c.slider_links : [],
          section: c.section ? c.section.sort((a, b) => a.position - b.position) : []
        });
        return cat;

      }));
  }

  saveHome(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/home`,
      data
    ,{headers:header}).subscribe(result => res(data.id),
                err => rej(err))
    );
  }

  saveImages(images: FileList, type: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      // formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${environment.host}/image/home/${type}`, formData,{headers:header}));
    }
    return new Promise((res, rej) => forkJoin(observables).pipe(take(1)).subscribe(done => res(), err => rej(err)));
  }

  removeImage(imageId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/image/${imageId}`,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  getPackages(): Observable<any[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<any[]>(`${environment.host}/home/packages`,{headers:header})
      .pipe<any[]>(map(ca => ca.map(c => {
        const cat = {
          id: c.id,
          image: c.image,
          title: c.title,
          duration: `${c.days}D/${c.nights}N`,
          priceWithTax: `₹${c.price_with_tax}${c.price_unit ? '/' + c.price_unit : ''}`,
          reviewPoints: c.review_points,
          reviewCount: c.review_count
        };
        return cat;
      })));
  }

  addSection(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/home/section`, data,{headers:header}).pipe(take(1))
      .subscribe(
        sec => {
          console.log(sec);
          res(sec['insertId']);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editSection(secId: string, data: any): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/home/section/${secId}`, data,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteSection(secId: string): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.delete(`${environment.host}/home/section/${secId}`,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  updateSectionPosition(sections: any): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/home/section/position`, {sections: sections},{headers:header})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  getSection(secId: string): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/home/section/${secId}`,{headers:header}).subscribe(
        sec => res(sec),
        err => rej(err)
      );
    });
  }

  addPackageToSection(secId: string, packageId: string, position: number): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/home/section/${secId}/package`, {
        sectionId: secId,
        packageId: packageId,
        position: position
      },{headers:header}).pipe(take(1))
      .subscribe(
        () => {
          res();
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  updatePackagePosition(secId: string, packages: any): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/home/section/${secId}/package/position`, {packages: packages},{headers:header})
      .subscribe(
        () => res(),
        err => { console.log(err); rej(err); }
      );
    });
  }

  addLink(type: string, refId: string, data: any, icon: File): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    
    return new Promise((res, rej) => {
      this.httpClient.post(`${environment.host}/link/${type}/${refId}`, formData,{headers:header}).pipe(take(1),)
      .subscribe(
        link => {
          res(link);
        },
        err => {
          rej(err);
        }  
      );
    });
  }

  editLink(type: string, refId: string, linkId: string, data: any, icon: File): Promise<void> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${environment.host}/link/${type}/${refId}/${linkId}`, formData,{headers:header}).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(linkId: string): Promise<void> {
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
