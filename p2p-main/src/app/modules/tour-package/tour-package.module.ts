import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourPackageRoutingModule } from './tour-package-routing.module';
import { TourPackageComponent } from './tour-package.component';
import { ImageSectionComponent } from './component/image-section/image-section.component';
import { NavSectionComponent } from './component/nav-section/nav-section.component';
import { AboutSectionComponent } from './component/about-section/about-section.component';
import { ItinerarySectionComponent } from './component/itinerary-section/itinerary-section.component';
import { ImageCarouselSectionComponent } from './component/image-carousel-section/image-carousel-section.component';
import { ReviewSectionComponent } from './component/review-section/review-section.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LandingPageModule } from '../landing-page/landing-page.module';
import { SectionModule } from 'src/app/shared/modules/section/section.module';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [TourPackageComponent,
    ImageSectionComponent,
    NavSectionComponent, AboutSectionComponent,
    ItinerarySectionComponent,
    ImageCarouselSectionComponent,
    ReviewSectionComponent,
  ],
  imports: [
    CommonModule,
    TourPackageRoutingModule,
    CarouselModule,
    LandingPageModule,
    SectionModule,
    LandingPageModule,
    LightboxModule
  ]
})
export class TourPackageModule { }
