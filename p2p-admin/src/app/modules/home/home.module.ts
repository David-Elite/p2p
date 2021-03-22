import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeFormComponent } from './home-form/home-form.component';
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

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [HomeFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

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
    MatDialogModule,
    DragDropModule,
    ScrollingModule,

    EditorModule,

    SharedModule,

    FuseSharedModule,
    FuseWidgetModule,
  ]
})
export class HomeModule { }
