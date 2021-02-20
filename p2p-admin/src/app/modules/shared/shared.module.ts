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



@NgModule({
  declarations: [EditorComponent, ZoneFilterPipe, MatSelectSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    EditorComponent,
    ZoneFilterPipe,
    MatSelectSearchComponent
  ]
})
export class SharedModule { }
