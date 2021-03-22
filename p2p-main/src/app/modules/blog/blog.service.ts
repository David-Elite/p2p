import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBlogs(): Promise<any[]> {
    return new Promise((res, rej) => {
      this.httpClient.get(`${environment.host}/blog`).subscribe({
        next: bg => res(bg as any[]),
        error: err => rej(err)
      });
    });
  }
}
