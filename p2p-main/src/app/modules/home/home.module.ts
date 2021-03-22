import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SectionModule } from 'src/app/shared/modules/section/section.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,

    //Http Client
    HttpClientModule,

    // Bootstrap Imports
    NgbCarouselModule,

    // Carousel Module
    CarouselModule,

    //Sections
    SectionModule
  ]
})
export class HomeModule { }
