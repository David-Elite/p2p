import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-title-link-with-image',
  templateUrl: './title-link-with-image.component.html',
  styleUrls: ['./title-link-with-image.component.scss']
})
export class TitleLinkWithImageComponent implements OnInit {
  @Input('section') section: any;

  sliderConfig: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
  constructor() { }

  ngOnInit(): void {
  }

}
