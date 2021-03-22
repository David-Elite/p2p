import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BlogService } from 'app/modules/blog/blog.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Blog } from '../blog.modal';

@Injectable({
  providedIn: 'root'
})
export class BlogFormResolver implements Resolve<boolean> {
  blog: Blog;
  onBlogChanged: BehaviorSubject<Blog> = new BehaviorSubject(null);

  constructor(private blogService: BlogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (route.params.id === 'new') {
      return Promise.resolve<boolean>(true);
    } else {
      return new Promise((res, rej) => {
        this.blogService.getBlog(route.params.id).subscribe(prod => {
          this.blog = prod;
          this.onBlogChanged.next(prod);
          res(true);
        });
      });
    }
  }
}
