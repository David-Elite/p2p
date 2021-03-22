import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteSectionComponent } from './components/favourite-section/favourite-section.component';
import { ProductCarouselSectionComponent } from './components/product-carousel-section/product-carousel-section.component';
import { LocationCarouselSectionComponent } from './components/location-carousel-section/location-carousel-section.component';
import { LocationTabsSectionComponent } from './components/location-tabs-section/location-tabs-section.component';
import { LocationBoxSectionComponent } from './components/location-box-section/location-box-section.component';
import { BlogGridSectionComponent } from './components/blog-grid-section/blog-grid-section.component';
import { ReviewGridSectionComponent } from './components/review-grid-section/review-grid-section.component';
import { PartnersGridSectionComponent } from './components/partners-grid-section/partners-grid-section.component';
import { InstagramSectionComponent } from './components/instagram-section/instagram-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { LocationTabSectionComponent } from './components/location-tab-section/location-tab-section.component';


@NgModule({
  declarations: [
    FavouriteSectionComponent,
    ProductCarouselSectionComponent,
    LocationCarouselSectionComponent,
    LocationTabsSectionComponent,
    LocationBoxSectionComponent,
    BlogGridSectionComponent,
    ReviewGridSectionComponent,
    PartnersGridSectionComponent,
    InstagramSectionComponent,
    FaqSectionComponent,
    LocationTabsSectionComponent,
    LocationTabSectionComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    RouterModule
  ],
  exports: [
    FavouriteSectionComponent,
    ProductCarouselSectionComponent,
    LocationCarouselSectionComponent,
    LocationTabsSectionComponent,
    LocationBoxSectionComponent,
    BlogGridSectionComponent,
    ReviewGridSectionComponent,
    PartnersGridSectionComponent,
    InstagramSectionComponent,
    FaqSectionComponent,
    LocationTabsSectionComponent,
    LocationTabSectionComponent
  ]
})
export class SectionModule { }
