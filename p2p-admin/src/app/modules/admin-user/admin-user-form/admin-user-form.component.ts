import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Adminuser } from '../admin-user.modal';
import { AdminuserService } from '../admin-user.service';
import { AdminuserFormResolver } from './admin-user-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-adminuser-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AdminuserFormComponent implements OnInit, OnDestroy {

  adminuser: Adminuser;
  pageType: string;
  adminuserForm: FormGroup;
  selectedImages: any = [];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AdminuserFormResolver} adminuserFormResolver
   * @param {AdminuserService} adminuserService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private adminuserFormResolver: AdminuserFormResolver,
    private adminuserService: AdminuserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {
    // Set the default
    this.adminuser = new Adminuser();

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
    // Subscribe to update adminuser on changes
    this.adminuserFormResolver.onAdminuserChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(adminuser => {

        if (adminuser) {
          this.adminuser = new Adminuser(adminuser);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.adminuser = new Adminuser();
        }

        this.adminuserForm = this.createAdminuserForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.adminuserFormResolver.adminuser = null;
    this.adminuserFormResolver.onAdminuserChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create adminuser form
   *
   * @returns {FormGroup}
   */
  createAdminuserForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.adminuser.id],
      userName: [this.adminuser.userName],  
      email: [this.adminuser.email],
      password: [this.adminuser.password],
      role: [this.adminuser.role],
      active: [this.adminuser.active]
    });
  }

  /**
   * Save adminuser
   */
  saveAdminuser(): void {
    const data = this.adminuserForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.adminuserService.saveAdminuser(data)
      .then(() => {

        // Trigger the subscription with new data
        this.adminuserFormResolver.onAdminuserChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Adminuser saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

 
  
  /**
   * Add adminuser
   */
  addAdminuser(): void {
    const data = this.adminuserForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.adminuserService.addAdminuser(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.adminuserFormResolver.onAdminuserChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Adminuser added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this.location.replaceState('adminusers/' + id);
      });
  }

}
