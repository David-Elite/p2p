import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Blog } from './blog.modal';

import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  host = 'http://localhost:8080';
  constructor(

    private httpClient: HttpClient
  ) { }

  getBlog(blogId: string): Observable<Blog> {
    return this.httpClient.get<any>(`${this.host}/blog/${blogId}`)
      .pipe<Blog>(map(c => {
        const cat: Blog = new Blog({
          id: c.id,
          blogType: c.blog_type,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          category: c.category ? c.category.split(',') : [],
          description: c.description,
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

      }));
  }


  getBlogs(): Observable<Blog[]> {
    return this.httpClient
      .get<any[]>(`${this.host}/blog`)
      .pipe<Blog[]>(map(ca => ca.map(c => {
        const cat: Blog = new Blog({
          id: c.id,
          blogType: c.blog_type,
          title: c.title,
          handle: c.handle,
          tags: c.tags ? c.tags.split(',') : [],
          category: c.category ? c.category.split(',') : [],
          description: c.description,
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

  addBlog(data: Blog): Promise<string> {
    return new Promise((res, rej) => this.httpClient.post(`${this.host}/blog`, data
    ).subscribe(result => res(data.id))
    );
  }

  saveBlog(data: any): Promise<any> {
    return new Promise((res, rej) => this.httpClient.put(`${this.host}/blog/${data.id}`, data
    ).subscribe(result => res(data.id))
    );
  }

  deleteBlog(blogId: string): Promise<void> {
    return Promise.resolve();
  }

  saveImages(id: string, images: FileList): Promise<any> {

    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    const observables = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      // formData.append('id', id);
      formData.append('file', images[i], images[i].name);

      observables.push(this.httpClient.post(`${this.host}/image/blog/${id}`, formData));
    }
    return forkJoin(observables).toPromise();
  }

  removeImage(id: string, imageId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/image/blog/${imageId}`)
        .subscribe(
          () => res(),
          err => rej(err)
        );
    });
  }

  addLink(id: string, data: any, icon: File): Promise<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }

    
    return new Promise((res, rej) => {
      this.httpClient.post(`${this.host}/link/blog/${id}`, formData).pipe(take(1))
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
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('url', data.url);
    if (icon) {
      formData.append('file', icon, icon.name);
    }
    return new Promise((res, rej) => {
      this.httpClient.put(`${this.host}/link/blog/${id}/${linkId}`, formData).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }

  deleteLink(id: string, linkId: string): Promise<void> {
    return new Promise((res, rej) => {
      this.httpClient.delete(`${this.host}/link/${linkId}`).subscribe(
        () => res(),
        err => rej(err)
      );
    });
  }
}
