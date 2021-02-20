import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HomeInitialSectionComponent } from './components/home-initial-section/home-initial-section.component';
import { HomeCarouselSectionComponent } from './components/home-carousel-section/home-carousel-section.component';
import { HomeVideoSectionComponent } from './components/home-video-section/home-video-section.component';
import { SectionModule } from 'src/app/shared/modules/section/section.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [HomeComponent,HomeSliderComponent, HomeInitialSectionComponent, HomeCarouselSectionComponent, HomeVideoSectionComponent],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    HomeRoutingModule,
    SectionModule,
    // BrowserAnimationsModule,
    NgbModule,
    CarouselModule
  ]
})
export class HomeModule { }
