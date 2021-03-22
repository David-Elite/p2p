import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LandingPageService } from 'src/app/modules/landing-page/landing-page.service';

@Component({
  selector: 'app-product-carousel-section',
  templateUrl: './product-carousel-section.component.html',
  styleUrls: ['./product-carousel-section.component.scss']
})
export class ProductCarouselSectionComponent implements OnInit {
  @Input() noOfPackages: number = 4;
  @Input() packages: any[] = [];
  @Input() title = '';
  @Input() subtitle = '';
  @Input() refId = '';
  @Input() sectionId = '';

  sliderthree: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 10,
    items: 4,
    slideBy: 4,
    rewind: true,
    autoplay: true,
    // center: true,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 1
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   },
    //   1140: {
    //     items: 4
    //   },
    // },
    nav: true
  }
  constructor(
    private landingPageService: LandingPageService
  ) { }

  ngOnInit(): void {
    this.landingPageService.getSection(this.refId, this.sectionId).then( section => {
      this.packages = section.packages;
      this.title = section.title;
      this.subtitle = section.subtitle;
    });
  }

}
