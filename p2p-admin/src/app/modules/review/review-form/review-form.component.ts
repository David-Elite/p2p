import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { Review } from '../review.modal';
import { ReviewService } from '../review.service';
import { ReviewFormResolver } from './review-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReviewFormComponent implements OnInit, OnDestroy {

  review: Review;
  pageType: string;
  reviewForm: FormGroup;
  selectedImages: any = [];
  reviewerImage: File;
  reviewerImageUrl;
  // reviews: Review[] = [];
  // sort: Review[] = [];
  reviewValue = '';
  packages = [];
  dispPkg = [];
  users = [];
  packageFilter = '';


  filteredOptions: Observable<string[]>;


  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ReviewFormResolver} reviewFormResolver
   * @param {ReviewService} reviewService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private reviewFormResolver: ReviewFormResolver,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {

    // this.getReviews();
    // Set the default
    this.review = new Review();
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

    //  this.filteredOptions = this.reviewForm.valueChanges.pipe(
    //    startWith(''),
    //    map(value => this._filter(value))
    //  )


    // Subscribe to update review on changes
    this.reviewFormResolver.onReviewChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(review => {
        if (review) {
          this.review = new Review(review);
          this.pageType = 'edit';
          this.reviewerImageUrl = review.reviewerImage;
        }
        else {
          this.pageType = 'new';
          this.review = new Review();
        }

        this.reviewForm = this.createReviewForm();
      });

    this.reviewService.getPackagesForReview().then(pkgs => {
      this.packages = pkgs;
      this.dispPkg = pkgs;
    });
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase()
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue)
  //   );
  // }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.reviewFormResolver.review = null;
    this.reviewFormResolver.onReviewChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create review form
   *
   * @returns {FormGroup}
   */
  createReviewForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.review.id],
      referenceId: [this.review.referenceId],
      reviewDate: [this.review.reviewDate],
      reviewTitle: [this.review.reviewTitle],
      reviewContent: [this.review.reviewContent],
      reviewPoints: [this.review.reviewPoints],
      reviewerId: [this.review.reviewerId],
      reviewerName: [this.review.reviewerName],
      reviewerTitle: [this.review.reviewerTitle],
      reviewerImage: [this.review.reviewerImage],
      active: [this.review.active],
    });
  }


  /**
   * Save review
   */
  saveReview(): void {
    const data = this.reviewForm.getRawValue();

    this.reviewService.saveReview(data, this.reviewerImage)
      .then(() => {

        // Trigger the subscription with new data
        this.reviewFormResolver.onReviewChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Review saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }


  /**
   * Add review
   */
  addReview(): void {
    const data = this.reviewForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.reviewService.addReview(data, this.reviewerImage)
      .then((id) => {

        // Trigger the subscription with new data
        this.reviewFormResolver.onReviewChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Review added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('review/review-form/' + this.review.id);
      });
  }

  filterPackages(): void {
    console.log(this.packageFilter);
    this.dispPkg = FuseUtils.filterArrayByString(this.packages, this.packageFilter);
  }

  uploadReviewerImage(event: any): void {
    this.reviewerImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.reviewerImage);
    reader.onload = (_event) => {
      this.reviewerImageUrl = reader.result;
    };

  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.reviewService.saveImages(this.review.id, this.selectedImages).then(() => {
      this.selectedImages = [];

      this.reviewService.getReview(this.review.id).subscribe(res => {
        this.reviewFormResolver.onReviewChanged.next(res);
        this.reviewFormResolver.review = res;
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
    this.reviewService.removeImage(this.review.id, image).then(() => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Image Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

}
