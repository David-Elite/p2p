import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeResolver } from './home.resolver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  home: any;
  searchText: string = '';

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
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
  constructor(
    private homeResolver: HomeResolver
  ) { }

  ngOnInit(): void {
    this.homeResolver.home.subscribe( home => {
      console.log(home);
      this.home = home;
    })
  }

}
