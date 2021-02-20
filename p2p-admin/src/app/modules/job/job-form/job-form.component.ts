import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Job } from '../job.modal';
import { JobService } from '../job.service';
import { JobFormResolver } from './job-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class JobFormComponent implements OnInit, OnDestroy {

  job: Job;
  pageType: string;
  jobForm: FormGroup;
  selectedImages: any = [];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {JobFormResolver} jobFormResolver
   * @param {JobService} jobService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private jobFormResolver: JobFormResolver,
    private jobService: JobService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {
    // Set the default
    this.job = new Job();

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
    // Subscribe to update job on changes
    this.jobFormResolver.onJobChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(job => {
        if (job) {
          this.job = new Job(job);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.job = new Job();
        }

        this.jobForm = this.createJobForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.jobFormResolver.job = null;
    this.jobFormResolver.onJobChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create job form
   *
   * @returns {FormGroup}
   */
  createJobForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.job.id],
      title: [this.job.title],
      overview: [this.job.overview],
      desc: [this.job.desc],
      rnr: [this.job.rnr],
      images: [this.job.images],
      active: [this.job.active]
    });
  }

  /**
   * Save job
   */
  saveJob(): void {
    const data = this.jobForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this.jobService.saveJob(data)
      .then(() => {

        // Trigger the subscription with new data
        this.jobFormResolver.onJobChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Job saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add job
   */
  addJob(): void {
    const data = this.jobForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this.jobService.addJob(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.jobFormResolver.onJobChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Job added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this.location.replaceState('jobs/' + id);
      });
  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.jobService.saveImages(this.job.id, this.selectedImages).then(() => {
      this.selectedImages = [];
      this.jobService.getJob(this.job.id).subscribe(res => {
        this.jobFormResolver.onJobChanged.next(res);
        this.jobFormResolver.job = res;
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
  //   this.jobService.removeImage(this.job.id, image).then(() => {
  //     this.fuseProgressBarService.hide();
  //     this.matSnackBar.open('Image Deleted', 'OK', {
  //       verticalPosition: 'top',
  //       duration: 2000
  //     });
  //   });
  // }
  removeImage(image: string): void {
    this.fuseProgressBarService.show();
    this.jobService.removeImage(this.job.id, image)
    this.fuseProgressBarService.hide();
    this.matSnackBar.open('Image Deleted', 'OK', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

}

