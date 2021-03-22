import { Component, OnInit, HostListener } from '@angular/core';
import { TourPackage } from './tour-package.model';
import { TourPackageResolver } from './tour-package.resolver';

@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss']
})
export class TourPackageComponent implements OnInit {
  package!: any;
  review = [
    {
      title: 'Adam Levin',
      subtitle: '19 Dec, 2020 - Solo Traveller',
      para: 'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
    {
      title: 'Adam Levin',
      subtitle: '19 Dec, 2020 - Solo Traveller',
      para: 'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
  ];

  itinerary = [
    {
      title: 'Day 1',
    },
    {
      title: 'Day 2',
    },
    {
      title: 'Day 3',
    },
  ];

  location = [
    {
      loc1: 'Rajasthan',
      loc2: 'Bangalore',
      loc3: 'Hyderabad',
      loc4: 'Mumbai',
      loc5: 'Shimla',
      loc6: 'Manali'
    },
    {
      loc1: 'Rajasthan',
      loc2: 'Bangalore',
      loc3: 'Hyderabad',
      loc4: 'Mumbai',
      loc5: 'Shimla',
      loc6: 'Manali'
    },
    {
      loc1: 'Rajasthan',
      loc2: 'Bangalore',
      loc3: 'Hyderabad',
      loc4: 'Mumbai',
      loc5: 'Shimla',
      loc6: 'Manali'
    },
    {
      loc1: 'Rajasthan',
      loc2: 'Bangalore',
      loc3: 'Hyderabad',
      loc4: 'Mumbai',
      loc5: 'Shimla',
      loc6: 'Manali'
    }
  ];

  noOfPackages = 5;
  homePackages = [
    {
      title: 'Some Package',
      review: 5.0,
      noOfReview: 40,
      price: 4000,
      comparedPrice: 8000,
      link: '/package/some-package'
    },
    {
      title: 'Some Package12',
      review: 5.0,
      noOfReview: 40,
      price: 4000,
      comparedPrice: 8000,
      link: '/package/some-package'
    },
    {
      title: 'Some Package123',
      review: 5.0,
      noOfReview: 40,
      price: 4000,
      comparedPrice: 8000,
      link: '/package/some-package'
    },
    {
      title: 'Some Package1234',
      review: 5.0,
      noOfReview: 40,
      price: 4000,
      comparedPrice: 8000,
      link: '/package/some-package'
    },
  ];

  activeNav: any;

  formVariable = false;

  constructor(
    private tourPackageResolver: TourPackageResolver
  ) {
    this.tourPackageResolver.package.subscribe(pkg => this.package = pkg);
  }

  ngOnInit(): void {

  }

  navToElement(el: HTMLElement): void {
    this.activeNav = el;
    console.log(this.activeNav);
    el.scrollIntoView(
      {
        behavior: 'smooth'
      }
    );

  }

  @HostListener('document:scroll')

  scrollFunction(): void {
    const verticalOff = window.pageYOffset;
    if (verticalOff > 734) {
      this.formVariable = true;
    } else if (verticalOff < 734) {
      this.formVariable = false;
    }
  }

}
