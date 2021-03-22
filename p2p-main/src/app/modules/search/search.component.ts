import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText = '';
  filterOpt = '';
  packages: any[] = [];
  zones: any[] = [];
  dispType = 'grid';
  isReset = false;

  // Filters
  destination = '';
  rate = 0;
  priceMin = 0;
  priceMax = 5000;

  sliderthree: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 20,
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
        items: 4
      },
      1140: {
        items: 5
      },
    },
    nav: true
  };

  constructor(
    private searchResolver: SearchResolver,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchResolver.packages.subscribe({
      next: pcks => {
        this.packages = pcks;
        console.log(this.packages);
      },
      error: err => console.log(err)
    });

    this.searchService.getZones().then(zn => {
      this.zones = zn as any[];
    });
  }

}
