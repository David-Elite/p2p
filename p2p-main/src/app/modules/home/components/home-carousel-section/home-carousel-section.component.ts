import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-carousel-section',
  templateUrl: './home-carousel-section.component.html',
  styleUrls: ['./home-carousel-section.component.scss']
})
export class HomeCarouselSectionComponent implements OnInit {
  sliderone: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
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
        items: 5
      },
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
