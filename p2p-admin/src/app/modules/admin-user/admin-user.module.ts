import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminuserRoutingModule } from './admin-user-routing.module';
import { ListAdminuserComponent } from './list-admin-user/list-admin-user.component';
import { AdminuserFormComponent } from './admin-user-form/admin-user-form.component';
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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [ListAdminuserComponent, AdminuserFormComponent],
  imports: [
    CommonModule,
    AdminuserRoutingModule,

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

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    // NgxChartsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    // }),

    FuseSharedModule,
    FuseWidgetModule,
  ]
})
export class AdminuserModule { }
