import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './component/editor/editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoneFilterPipe } from './pipe/zone-filter.pipe';
import { MatSelectSearchComponent } from './component/mat-select-search/mat-select-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SectionComponent } from './component/section/section.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [EditorComponent, ZoneFilterPipe, MatSelectSearchComponent, SectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    DragDropModule,
    ScrollingModule,
  ],
  exports: [
    EditorComponent,
    ZoneFilterPipe,
    MatSelectSearchComponent,
    SectionComponent,
  ]
})
export class SharedModule { }
