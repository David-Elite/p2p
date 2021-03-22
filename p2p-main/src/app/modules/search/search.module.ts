import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,

    CarouselModule,

    NgbRatingModule,

    NgxSliderModule
  ]
})
export class SearchModule { }
