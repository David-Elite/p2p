import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-image-carousel-section',
  templateUrl: './image-carousel-section.component.html',
  styleUrls: ['./image-carousel-section.component.scss']
})
export class ImageCarouselSectionComponent implements OnInit {
  sliderone: OwlOptions = {
    loop: true,
    autoplay: true,
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
        items: 1
      },
      940: {
        items: 1
      },
      1140: {
        items: 1
      },
    },
    // nav: true
  };

@Input() images: any;

  constructor() { }

  ngOnInit(): void {
  }

}
