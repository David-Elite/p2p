import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from '../page.modal';
import { PageService } from '../page.service';
import { PageFormResolver } from './page-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PageFormComponent implements OnInit, OnDestroy {

  page: Page;
  pageType: string;
  pageForm: FormGroup;
  selectedImages: any = [];
  pages: Page[] = [];
  sort: Page[] = [];
  pageValue = '';
  active = 0;


  // Links Vars
  linkId = '';
  linkTitle = '';
  linkUrl = '';
  linkIcon: File;
  displayIcon: string | ArrayBuffer = '';


  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {PageFormResolver} pageFormResolver
   * @param {PageService} pageService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private pageFormResolver: PageFormResolver,
    private pageService: PageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {

    this.getPages();
    // Set the default
    this.page = new Page();
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
    // Subscribe to update page on changes
    this.pageFormResolver.onPageChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(page => {
        if (page) {
          this.page = new Page(page);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.page = new Page();
        }

        this.pageForm = this.createPageForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.pageFormResolver.page = null;
    this.pageFormResolver.onPageChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create page form
   *
   * @returns {FormGroup}
   */
  createPageForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.page.id],
      title: [this.page.title],
      handle: [this.page.handle],
      content: [this.page.content],
      tags: [this.page.tags],
      metaTitle: [this.page.metaTitle],
      metaDesc: [this.page.metaDescription],
      metaKeywords: [this.page.metaKeywords],
      active: [this.page.active],
      images: [this.page.images],
    });
  }

  getDirtyValues(form: any): any {
    const dirtyValues = {};

    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getDirtyValues(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;
          }
        }
      });
    return dirtyValues;
  }

  /**
   * Save page
   */
  savePage(): void {
    const data = this.getDirtyValues(this.pageForm);
    // data.handle = FuseUtils.handleize(data.title);

    this.pageService.savePage(this.page.id, data)
      .then(() => {

        // Trigger the subscription with new data
        this.pageFormResolver.onPageChanged.next(this.pageForm.getRawValue());

        // Show the success message
        this.matSnackBar.open('Page saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }
  // Get pages


  getPages(): void {
    this.pageService.getPages().subscribe({
      next: (res) => this.pages = res,
      error: (err) => console.log(err) 
    });
  }

  // getPages(){
  //  this.pageService.getPages().subscribe(res=> {
  //   const temp = res.filter(r => (r.id !== this.page.id && r.parent !== this.page.id));
  //   this.pageSort(temp);
  //  });
  // }


  // pageSort(unsortPages: Page[]){
  //   this.pages = [];
  //   unsortPages.filter(z => (z.parent === null || z.parent === '')).forEach( z => {
  //     const temp = this.getPnC(z, unsortPages);
  //     this.pages.push(...temp);
  //   });
  // }

  // getPnC(z: Page, unsortPages: Page[]): Page[] {
  //   const zn: Page[] = [];
  //   zn.push(z);
  //   unsortPages.filter(uz => uz.parent === z.id).forEach( zon => {
  //     // zn.push(zon);
  //     zn.push(...this.getPnC(zon, unsortPages));
  //   });
  //   return zn;
  // }


  /**
   * Add page
   */
  addPage(): void {
    const data = this.pageForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this.pageService.addPage(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.pageFormResolver.onPageChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Page added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('pages/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.pageService.saveImages(this.page.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.pageService.getPage(this.page.id).subscribe(res => {
        this.pageFormResolver.onPageChanged.next(res);
        this.pageFormResolver.page = res;
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
    this.pageService.removeImage(this.page.id, image).then(() => {
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
      this.pageService.addLink(this.page.id, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.pageService.getPage(this.page.id).subscribe(res => {
            this.pageFormResolver.onPageChanged.next(res);
            this.pageFormResolver.page = res;
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
      this.pageService.editLink(this.page.id, this.linkId, {
        title: this.linkTitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.pageService.getPage(this.page.id).subscribe(res => {
            this.pageFormResolver.onPageChanged.next(res);
            this.pageFormResolver.page = res;
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
    const link = this.page.link.find(m => m.id === linkId);
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
    this.pageService.deleteLink(this.page.id, linkId)
      .then(() => {
        this.pageService.getPage(this.page.id).subscribe(res => {
          this.pageFormResolver.onPageChanged.next(res);
          this.pageFormResolver.page = res;
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

