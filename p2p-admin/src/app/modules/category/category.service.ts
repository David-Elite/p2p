import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Category } from './category.modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  getCategory(categoryId: string): Observable<Category> {
    return this.httpClient.get<{ id: string; name: string; handle: string; description: string; tags: string; images: string }>(`${this.host}/category/${categoryId}`)
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
    return this.httpClient
      .get<{ id: any; name: any; handle: any; description: any; tags: string, images: string }[]>(`${this.host}/category`)
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
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/category`,
      {
        id: data.id,
        name: data.name,
        handle: data.handle,
        description: data.description,
        tags: data.tags.toString()
      }
    ).subscribe(result => res(data.id))
    );
  }

  saveCategory(data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/category/${data.id}`,
      {
        id: data.id,
        name: data.name,
        handle: data.handle,
        description: data.description,
        tags: data.tags.toString()
      }
    ).subscribe(result => res(data.id))
    );
  }

  deleteCategory(categoryId: string): Promise<void> {
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

      observables.push(this.httpClient.post(`${this.host}/category/image`, formData));
    }
    return forkJoin(observables).toPromise();
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/category/images/${imageId}`)
      .subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
