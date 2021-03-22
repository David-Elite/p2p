import { Component, OnInit } from '@angular/core';
import { BlogListResolver } from './blog-list.resolver';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  constructor(
    private blogListResolver: BlogListResolver
  ) { }

  ngOnInit(): void {
    this.blogListResolver.blogs.subscribe(bg => {
      console.log(bg);
      this.blogs = bg;
    })
  }

}
