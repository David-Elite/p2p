import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../shared/shared.module';

import { NgxStarRatingModule } from 'ngx-star-rating';


@NgModule({
  declarations: [ListOrderComponent, OrderFormComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,

    MatButtonModule,
    MatChipsModule,
    // MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    // NgxChartsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    // }),

    SharedModule,

    NgxStarRatingModule,

    FuseSharedModule,
    FuseWidgetModule,
  ]
})
export class OrderModule { }
