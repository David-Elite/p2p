import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlogService } from '../blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogListResolver implements Resolve<boolean> {
  blogs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private blogService: BlogService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.blogService.getBlogs()
      .then(bg => {
        this.blogs.next(bg);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }
}
