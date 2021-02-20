import { Component, OnInit, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourPackageService } from '../tour-package/tour-package.service';
import { TourPackageResolver } from './tour-package.resolver';

@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss']
})
export class TourPackageComponent implements OnInit {

  
// nav = [
//   {
//     title:'Details',
//   },
//   {
//     title:'Itinerary',
//   },
//   {
//     title:'Photos',
//   },
//   {
//     title:'Reviews',
//   },
//   {
//     title:'FAQ',
//   }
// ];

review=[
  {
    title:'Adam Levin',
    subtitle:"19 Dec, 2020 - Solo Traveller",
    para:"Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation",
  },
  {
    title:'Adam Levin',
    subtitle:"19 Dec, 2020 - Solo Traveller",
    para:"Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation",
  },
];

itinerary = [
  {
    title:'Day 1',
  },
  {
    title:'Day 2',
  },
  {
    title:'Day 3',
  },
];

location = [
  {
    loc1:'Rajasthan',
    loc2:'Bangalore',
    loc3:'Hyderabad',
    loc4:'Mumbai',
    loc5:'Shimla',
    loc6:'Manali'
  },
  {
    loc1:'Rajasthan',
    loc2:'Bangalore',
    loc3:'Hyderabad',
    loc4:'Mumbai',
    loc5:'Shimla',
    loc6:'Manali'
  },
  {
    loc1:'Rajasthan',
    loc2:'Bangalore',
    loc3:'Hyderabad',
    loc4:'Mumbai',
    loc5:'Shimla',
    loc6:'Manali'
  },
  {
    loc1:'Rajasthan',
    loc2:'Bangalore',
    loc3:'Hyderabad',
    loc4:'Mumbai',
    loc5:'Shimla',
    loc6:'Manali'
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

package: any;

  constructor(
    private tourPackageService: TourPackageService,
    private tourPackageResolver: TourPackageResolver,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(param => {
      const handle = param.handle;
      console.log(handle);
      this.tourPackageService.getTourPackageByHandle(handle).then(pkg => {
        this.package = pkg;
        console.log(this.package);
      });
    });
  }

  ngOnInit(): void {
  
  }

  navToElement(el: HTMLElement) {
  this.activeNav = el
  console.log(this.activeNav)
    el.scrollIntoView(
      {
        behavior: 'smooth'
      }
    );
  
  }

  form_variable = false;
  
  @HostListener("document:scroll")

  scrollFunction() {
       const verticalOff =  window.pageYOffset;
       if(verticalOff > 734 ){
         this.form_variable = true;
       }else if(verticalOff < 734){
         this.form_variable = false;
       }
  }

}
