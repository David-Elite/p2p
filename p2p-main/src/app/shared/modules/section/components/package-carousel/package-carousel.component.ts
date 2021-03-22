import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-package-carousel',
  templateUrl: './package-carousel.component.html',
  styleUrls: ['./package-carousel.component.scss']
})
export class PackageCarouselComponent implements OnInit {
  @Input('section') section: any;
  @Input('packages') packages: any[] = [];
  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';

  sliderConfig: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoWidth: true,
    dots: false,
    navSpeed: 700,
    nav: false
  };
  constructor() { }

  ngOnInit(): void {
    if (this.section) {
      this.packages = this.section.packages;
      this.title = this.section.title;
      this.subtitle = this.section.subtitle;
    }
  }

}
