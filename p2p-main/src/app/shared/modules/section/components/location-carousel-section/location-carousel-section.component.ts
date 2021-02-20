import { Component, OnInit,Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-location-carousel-section',
  templateUrl: './location-carousel-section.component.html',
  styleUrls: ['./location-carousel-section.component.scss']
})
export class LocationCarouselSectionComponent implements OnInit {
  @Input() title = '';
  @Input() locationCarousel:any[] = [];

  sliderfour: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:15,
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
