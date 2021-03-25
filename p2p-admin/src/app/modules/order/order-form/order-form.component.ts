import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { Order } from '../order.modal';
import { OrderService } from '../order.service';
import { OrderFormResolver } from './order-form.resolver';
import { Location } from '@angular/common';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class OrderFormComponent implements OnInit, OnDestroy {

  order: Order;
  pageType: string;
  orderForm: FormGroup;
  selectedImages: any = [];
  ordererImage: File;
  ordererImageUrl;
  // orders: Order[] = [];
  // sort: Order[] = [];
  orderValue = '';
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
   * @param {OrderFormResolver} orderFormResolver
   * @param {OrderService} orderService
   * @param {FormBuilder} formBuilder
   * @param {Location} location
   * @param {MatSnackBar} matSnackBar
   */
  constructor(
    private orderFormResolver: OrderFormResolver,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private fuseProgressBarService: FuseProgressBarService
  ) {

    // this.getOrders();
    // Set the default
    this.order = new Order();
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

    //  this.filteredOptions = this.orderForm.valueChanges.pipe(
    //    startWith(''),
    //    map(value => this._filter(value))
    //  )


    // Subscribe to update order on changes
    this.orderFormResolver.onOrderChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(order => {
        if (order) {
          this.order = new Order(order);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.order = new Order();
        }

        this.orderForm = this.createOrderForm();
      });

    this.orderService.getPackagesForOrder().then(pkgs => {
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
    this.orderFormResolver.order = null;
    this.orderFormResolver.onOrderChanged.next(null);
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create order form
   *
   * @returns {FormGroup}
   */
  createOrderForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.order.id],
      referenceId: [this.order.referenceId],
      orderDate: [this.order.orderDate],
      customerId: [this.order.customerId],
      customerName: [this.order.customerName],
      adults: [this.order.adults],
      childrens: [this.order.childrens],
      active: [this.order.active],
    });
  }


  /**
   * Save order
   */
  saveOrder(): void {
    const data = this.orderForm.getRawValue();

    this.orderService.saveOrder(data, this.ordererImage)
      .then(() => {

        // Trigger the subscription with new data
        this.orderFormResolver.onOrderChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Order saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }


  /**
   * Add order
   */
  addOrder(): void {
    const data = this.orderForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.orderService.addOrder(data, this.ordererImage)
      .then((id) => {

        // Trigger the subscription with new data
        this.orderFormResolver.onOrderChanged.next(data);

        // Show the success message
        this.matSnackBar.open('Order added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the Location with new one
        this.location.replaceState('order/order-form/' + this.order.id);
      });
  }

  filterPackages(): void {
    console.log(this.packageFilter);
    this.dispPkg = FuseUtils.filterArrayByString(this.packages, this.packageFilter);
  }

  uploadOrdererImage(event: any): void {
    this.ordererImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.ordererImage);
    reader.onload = (_event) => {
      this.ordererImageUrl = reader.result;
    };

  }

  uploadImages(event: any): void {
    this.fuseProgressBarService.show();
    this.selectedImages = event.target.files;
    this.orderService.saveImages(this.order.id, this.selectedImages).then(() => {
      this.selectedImages = [];

      this.orderService.getOrder(this.order.id).subscribe(res => {
        this.orderFormResolver.onOrderChanged.next(res);
        this.orderFormResolver.order = res;
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
    this.orderService.removeImage(this.order.id, image).then(() => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Image Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

}
