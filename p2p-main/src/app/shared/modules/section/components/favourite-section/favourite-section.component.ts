import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-favourite-section',
  templateUrl: './favourite-section.component.html',
  styleUrls: ['./favourite-section.component.scss']
})
export class FavouriteSectionComponent implements OnInit {
@Input() title = '';
@Input() favourite:any [] = [];

  slidertwo: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin:0,
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
