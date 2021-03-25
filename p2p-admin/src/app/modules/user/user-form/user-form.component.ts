import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../user.modal';
import { UserService } from '../user.service';
import { UserFormResolver } from './user-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserFormComponent implements OnInit, OnDestroy {

  user: User;
  pageType: string;
  userForm: FormGroup;
  selectedImages: any = [];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {UserFormResolver} userFormResolver
   * @param {UserService} userService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private userFormResolver: UserFormResolver,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {
    // Set the default
    this.user = new User();

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
    // Subscribe to update user on changes
    this.userFormResolver.onUserChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(user => {
        if (user) {
          this.user = new User(user);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.user = new User();
        }

        this.userForm = this.createUserForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.userFormResolver.user = null;
    this.userFormResolver.onUserChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create user form
   *
   * @returns {FormGroup}
   */
  createUserForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.user.id],
      userName: [this.user.userName],  
      email: [this.user.email],
      mobile: [this.user.mobile],
      gender: [this.user.gender],
      country: [this.user.country],
      password: [this.user.password],
      active: [this.user.active]
    });
  }

  /**
   * Save user
   */
  saveUser(): void {
    const data = this.userForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.userService.saveUser(data)
      .then(() => {

        // Trigger the subscription with new data
        this.userFormResolver.onUserChanged.next(data);

        // Show the success message
        this.matSnackBar.open('User saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

 
  
  /**
   * Add user
   */
  addUser(): void {
    const data = this.userForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.userService.addUser(data)
      .then((id) => {

        // Trigger the subscription with new data
        this.userFormResolver.onUserChanged.next(data);

        // Show the success message
        this.matSnackBar.open('User added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this.location.replaceState('user/' + id);
      });
  }

}
