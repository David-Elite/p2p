import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  sliderthree: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:60,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: this.noOfPackages
      },
      1140: {
        items: this.noOfPackages
      },
    },
    nav: true
  }
  constructor() { }

  ngOnInit(): void {
  }

}
