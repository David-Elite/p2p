import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleLinkWithImageComponent } from './components/title-link-with-image/title-link-with-image.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SimpleLinkSliderComponent } from './components/simple-link-slider/simple-link-slider.component';
import { PackageCarouselComponent } from './components/package-carousel/package-carousel.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZoneListComponent } from './components/zone-list/zone-list.component';



@NgModule({
  declarations: [TitleLinkWithImageComponent, SimpleLinkSliderComponent, PackageCarouselComponent, ZoneListComponent],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    TitleLinkWithImageComponent,
    SimpleLinkSliderComponent,
    PackageCarouselComponent,
    ZoneListComponent
  ]
})
export class SectionModule { }
