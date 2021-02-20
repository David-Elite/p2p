import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { ImageSectionComponent } from './component/image-section/image-section.component';
import { TableSectionComponent } from './component/table-section/table-section.component';
import { SectionModule } from 'src/app/shared/modules/section/section.module';
import { PackagesSectionComponent } from './component/packages-section/packages-section.component';
import { LocationTabSectionComponent } from '../../shared/modules/section/components/location-tab-section/location-tab-section.component';
import { ReviewSectionComponent } from './component/review-section/review-section.component';
import { FaqSectionComponent } from 'src/app/shared/modules/section/components/faq-section/faq-section.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    ImageSectionComponent,
    TableSectionComponent,
    PackagesSectionComponent,
    ReviewSectionComponent,

  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SectionModule
  ],
  exports: []
})
export class LandingPageModule { }
