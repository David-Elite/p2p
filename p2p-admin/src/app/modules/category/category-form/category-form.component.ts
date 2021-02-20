import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../category.modal';
import { CategoryService } from '../category.service';
import { CategoryFormResolver } from './category-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  category: Category;
  pageType: string;
  categoryForm: FormGroup;
  selectedImages: any = [];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CategoryFormResolver} categoryFormResolver
   * @param {CategoryService} categoryService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private categoryFormResolver: CategoryFormResolver,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {
    // Set the default
    this.category = new Category();

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
    // Subscribe to update category on changes
    this.categoryFormResolver.onCategoryChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(category => {

        if (category) {
          this.category = new Category(category);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.category = new Category();
        }

        this.categoryForm = this.createCategoryForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.categoryFormResolver.category = null;
    this.categoryFormResolver.onCategoryChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create category form
   *
   * @returns {FormGroup}
   */
  createCategoryForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name],
      handle: [this.category.handle],
      description: [this.category.description],
      tags: [this.category.tags],
      images: [this.category.images],
      active: [this.category.active]
    });
  }

  /**
   * Save category
   */
  saveCategory(): void {
    const data = this.categoryForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this.categoryService.saveCategory(data)
      .then(() => {

        // Trigger the subscription with new data
        this.categoryFormResolver.onCategoryChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Category saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add category
   */
  addCategory(): void {
    const data = this.categoryForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this.categoryService.addCategory(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.categoryFormResolver.onCategoryChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Category added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this.location.replaceState('categories/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.categoryService.saveImages(this.category.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.categoryService.getCategory(this.category.id).subscribe(res => {
        this.categoryFormResolver.onCategoryChanged.next(res);
        this.categoryFormResolver.category = res;
        this.fuseProgressBarService.hide();
      this.matSnackBar.open('Images added', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
      });
    });
  }

  // removeImage(image: string): void {
  //   this.fuseProgressBarService.show();
  //   this.categoryService.removeImage(this.category.id, image).then(() => {
  //     this.fuseProgressBarService.hide();
  //     this.matSnackBar.open('Image Deleted', 'OK', {
  //       verticalPosition: 'top',
  //       duration: 2000
  //     });
  //   });
  // }
  removeImage(image: string): void {
    this.fuseProgressBarService.show();
    this.categoryService.removeImage(this.category.id, image)
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Image Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
    });
  }

}

