import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-simple-link-slider',
  templateUrl: './simple-link-slider.component.html',
  styleUrls: ['./simple-link-slider.component.scss']
})
export class SimpleLinkSliderComponent implements OnInit {
  @Input('section') section: any;
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
  }
  constructor() { }

  ngOnInit(): void {
  }

}
