import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Category } from './category.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getCategory(categoryId: string): Observable<Category> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient.get<{ id: string; name: string; handle: string; description: string; tags: string; images: string }>(`${environment.host}/category/${categoryId}`,{headers:header})
      .pipe<Category>(map(c => {
        const cat: Category = new Category({
          id: c.id,
          name: c.name,
          handle: c.handle,
          description: c.description,
          tags: c.tags ? c.tags.split(',') : [],
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      }));
  }


  getCategories(): Observable<Category[]> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return this.httpClient
      .get<{ id: any; name: any; handle: any; description: any; tags: string, images: string }[]>(`${environment.host}/category`,{headers:header})
      .pipe<Category[]>(map(ca => ca.map(c => {
        const cat: Category = new Category({
          id: c.id,
          name: c.name,
          handle: c.handle,
          description: c.description,
          tags: c.tags ? c.tags.split(',') : [],
          images: c.images ? c.images : [],
          active: true
        });
        return cat;

      })));
  }

  addCategory(data: Category): Promise<string> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.post(`${environment.host}/category`,
      {
        id: data.id,
        name: data.name,
        handle: data.handle,
        description: data.description,
        tags: data.tags.toString()
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  saveCategory(data: any): Promise<any> {
    let token = localStorage.getItem('token');
    if(!token) {
   token='';      
    }
    const header = {
      'Authorization': `bearer ${token}` 
    }
    return new Promise((res, rej) => this.httpClient.put(`${environment.host}/category/${data.id}`,
      {
        id: data.id,
        name: data.name,
        handle: data.handle,
        description: data.description,
        tags: data.tags.toString()
      },{headers:header}
    ).subscribe(result => res(data.id))
    );
  }

  deleteCategory(categoryId: string): Promise<void> {
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

      observables.push(this.httpClient.post(`${environment.host}/category/image`, formData,{headers:header}));
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
      this.httpClient.delete(`${environment.host}/category/images/${imageId}`,{headers:header})
      .subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
