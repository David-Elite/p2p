import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blog } from '../blog.modal';
import { BlogService } from '../blog.service';
import { BlogFormResolver } from './blog-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/service/user/user.service';
import { promises } from 'dns';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BlogFormComponent implements OnInit, OnDestroy {

  blog: Blog;
  pageType: string;
  blogForm: FormGroup;
  selectedImages: any = [];
  blogs: Blog[] = [];
  sort: Blog[] = [];
  blogValue = '';
  active = 0;


  // Links Vars
  linkId = '';
  linkTitle = '';
  linkUrl = '';
  linkIcon: File;
  displayIcon: string | ArrayBuffer = '';


  // Private
  private unsubscribeAll: Subject<any>;
  user: any;

  /**
   * Constructor
   *
   * @param {BlogFormResolver} blogFormResolver
   * @param {BlogService} blogService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private blogFormResolver: BlogFormResolver,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService,
    private userService : UserService,
    private HttpClient : HttpClient
  ) {

    this.getBlogs();
    // Set the default
    this.blog = new Blog();
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to update blog on changes
    this.blogFormResolver.onBlogChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(blog => {
        if (blog) {
          this.blog = new Blog(blog);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.blog = new Blog();
        }

        this.blogForm = this.createBlogForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.blogFormResolver.blog = null;
    this.blogFormResolver.onBlogChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create blog form
   *
   * @returns {FormGroup}
   */
  createBlogForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.blog.id],
      title: [this.blog.title],
      handle: [this.blog.handle],
      description: [this.blog.description],
      content: [this.blog.content],
      author: [this.blog.author],
      date: [this.blog.date],
      category: [this.blog.category],
      tags: [this.blog.tags],
      metaTitle: [this.blog.metaTitle],
      metaDesc: [this.blog.metaDescription],
      metaKeywords: [this.blog.metaKeywords],
      active: [this.blog.active],
      images: [this.blog.images],
    });
  }


  /**
   * Save blog
   */
  saveBlog(): void {
    const data = this.blogForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.title);

    this.blogService.saveBlog(data)
      .then(() => {

        // Trigger the subscription with new data
        this.blogFormResolver.onBlogChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Blog saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }
  // Get blogs


  getBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (res) => this.blogs = res,
      error: (err) => console.log(err) 
    });
  }

  // getBlogs(){
  //  this.blogService.getBlogs().subscribe(res=> {
  //   const temp = res.filter(r => (r.id !== this.blog.id && r.parent !== this.blog.id));
  //   this.blogSort(temp);
  //  });
  // }


  // blogSort(unsortBlogs: Blog[]){
  //   this.blogs = [];
  //   unsortBlogs.filter(z => (z.parent === null || z.parent === '')).forEach( z => {
  //     const temp = this.getPnC(z, unsortBlogs);
  //     this.blogs.push(...temp);
  //   });
  // }

  // getPnC(z: Blog, unsortBlogs: Blog[]): Blog[] {
  //   const zn: Blog[] = [];
  //   zn.push(z);
  //   unsortBlogs.filter(uz => uz.parent === z.id).forEach( zon => {
  //     // zn.push(zon);
  //     zn.push(...this.getPnC(zon, unsortBlogs));
  //   });
  //   return zn;
  // }


  /**
   * Add blog
   */
  addBlog(): void {
    const data = this.blogForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this.blogService.addBlog(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.blogFormResolver.onBlogChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Blog added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('blogs/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.blogService.saveImages(this.blog.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.blogService.getBlog(this.blog.id).subscribe(res => {
        this.blogFormResolver.onBlogChanged.next(res);
        this.blogFormResolver.blog = res;
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Images added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    });
  }

  removeImage(image: string): void {
    this.fuseProgressBarService.show();
    this.blogService.removeImage(this.blog.id, image).then(() => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Image Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  uploadLinkIcon(event: any): void {
    this.linkIcon = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.linkIcon);
    reader.onload = (_event) => {
      this.displayIcon = reader.result;
    };
  }

  saveLink(): void {
    this.fuseProgressBarService.show();
    if (this.linkId === '' || this.linkId === null) {
      this.blogService.addLink(this.blog.id, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.blogService.getBlog(this.blog.id).subscribe(res => {
            this.blogFormResolver.onBlogChanged.next(res);
            this.blogFormResolver.blog = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Added', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.blogService.editLink(this.blog.id, this.linkId, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.blogService.getBlog(this.blog.id).subscribe(res => {
            this.blogFormResolver.onBlogChanged.next(res);
            this.blogFormResolver.blog = res;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Updated', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    }
  }

  editLink(linkId: string): void {
    this.linkId = linkId;
    const link = this.blog.link.find(m => m.id === linkId);
    this.linkTitle = link?.title;
    this.linkUrl = link?.url;
    this.displayIcon = link?.icon;
    this.linkIcon = null;
  }
  clearLink(): void {
    this.linkId = '';
    this.linkTitle = '';
    this.linkIcon = null;
    this.displayIcon = '';
    this.linkUrl = '';
  }

  deleteLink(linkId: string): void {
    this.fuseProgressBarService.show();
    this.blogService.deleteLink(this.blog.id, linkId)
      .then(() => {
        this.blogService.getBlog(this.blog.id).subscribe(res => {
          this.blogFormResolver.onBlogChanged.next(res);
          this.blogFormResolver.blog = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Link Deleted', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occured', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  handleTabChange(event: any): void {
    this.active = event.index;
  }



}

 


 