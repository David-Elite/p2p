import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Blog } from '../blog.modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlogService } from '../blog.service';

@Injectable({
  providedIn: 'root'
})
export class ListBlogResolver implements Resolve<boolean> {
  blogs: Blog[] = [];
  onBlogsChanged: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
  constructor(private blogService: BlogService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.blogService.getBlogs().subscribe( blog => {
        console.log(blog);
        if (blog) {
          this.blogs = blog;
          this.onBlogsChanged.next(blog);
        }
        res(true);
        // return true;
      },
      err => {
        console.log(err);
        res(false);
      });
    });
  }
}
