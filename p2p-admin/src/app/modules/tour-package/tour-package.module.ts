import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourPackageRoutingModule } from './tour-package-routing.module';
import { ListTourPackageComponent } from './list-tour-package/list-tour-package.component';
import { TourPackageFormComponent } from './tour-package-form/tour-package-form.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [ListTourPackageComponent, TourPackageFormComponent],
  imports: [
    CommonModule,
    TourPackageRoutingModule,

    MatButtonModule,
    MatChipsModule,
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
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,

    EditorModule,

    SharedModule,

    FuseSharedModule,
    FuseWidgetModule,
  ]
})
export class TourPackageModule { }
