import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingPageService } from '../landing-page/landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  tabledata = [
    {
      id:'1',
      packageName:'Magical Ladakh Backpacking Tour Packages with Camping',
      duration:'4 Nights',
      price:'₹ 13,800'
    },
    {
      id:'2',
      packageName:'Magical Ladakh Backpacking Tour Packages with Camping',
      duration:'4 Nights',
      price:'₹ 13,800'
    },
    {
      id:'3',
      packageName:'Magical Ladakh Backpacking Tour Packages with Camping',
      duration:'4 Nights',
      price:'₹ 13,800'
    },
    {
      id:'4',
      packageName:'Magical Ladakh Backpacking Tour Packages with Camping',
      duration:'4 Nights',
      price:'₹ 13,800'
    },
    {
      id:'5',
      packageName:'Magical Ladakh Backpacking Tour Packages with Camping',
      duration:'4 Nights',
      price:'₹ 13,800'
    },
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

  packages = [
    {
      title:'Grand Island Goa Scuba Diving',
      date:'6 Days 7 Nights',
      location:'Mumbai',
      details:'Maximum altitude: 5,130 mTemperature Range: Day is 25-30 degrees and night is 04-15 degreesOne of the most popular trekking route in Ladakh, the Kang Yatse Trek with Markha Valley Trek is a heaven for nature enthusiasts. Walking on the banks of beautiful',
      price:'₹ 15,999',
      comparePrice:'From ₹ 19,999',
      reviews1:'5.0',
      reviews2 :'| 40 Reviews',
    },
    {
      title:'Grand Island Goa Scuba Diving',
      date:'6 Days 7 Nights',
      location:'Mumbai',
      details:'Maximum altitude: 5,130 mTemperature Range: Day is 25-30 degrees and night is 04-15 degreesOne of the most popular trekking route in Ladakh, the Kang Yatse Trek with Markha Valley Trek is a heaven for nature enthusiasts. Walking on the banks of beautiful',
      price:'₹ 15,999',
      comparePrice:'From ₹ 19,999',
      reviews:'5.0 | 40 Reviews',
    },
    {
      title:'Grand Island Goa Scuba Diving',
      date:'6 Days 7 Nights',
      location:'Mumbai',
      details:'Maximum altitude: 5,130 mTemperature Range: Day is 25-30 degrees and night is 04-15 degreesOne of the most popular trekking route in Ladakh, the Kang Yatse Trek with Markha Valley Trek is a heaven for nature enthusiasts. Walking on the banks of beautiful',
      price:'₹ 15,999',
      comparePrice:'From ₹ 19,999',
      reviews:'5.0 | 40 Reviews',
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

  blog = [
    {
      title:'Title',
      date:'Aug 30, 2020',
      comments:'2 Comments'
    },
    {
      title:'Title',
      date:'Aug 30, 2020',
      comments:'2 Comments'
    },
    {
      title:'Title',
      date:'Aug 30, 2020',
      comments:'2 Comments'
    },
    {
      title:'Title',
      date:'Aug 30, 2020',
      comments:'2 Comments'
    }
  ];

  locationBox = [
    {
      t1:'Himachal Pradesh',
      t2:'Rajasthan',
      t3:'Madhya Pradesh',
      t4:'Himachal Pradesh',
      t5:'Bangalore',
      t6:'Mumbai',
    },
    {
      t1:'Himachal Pradesh',
      t2:'Rajasthan',
      t3:'Madhya Pradesh',
      t4:'Himachal Pradesh',
      t5:'Bangalore',
      t6:'Mumbai',
    },
    {
      t1:'Himachal Pradesh',
      t2:'Rajasthan',
      t3:'Madhya Pradesh',
      t4:'Himachal Pradesh',
      t5:'Bangalore',
      t6:'Mumbai',
    },
    {
      t1:'Himachal Pradesh',
      t2:'Rajasthan',
      t3:'Madhya Pradesh',
      t4:'Himachal Pradesh',
      t5:'Bangalore',
      t6:'Mumbai',
    },
  ];

  review = [
    {
      title:'Adam Levine',
      date:'19 Dec, 2020 - Solo Traveller',
      title2:'One of the amazing Trip',
      review:'Reviewed:',
      review2:'Kudremukh Trek, Chikmagalur | Book @ Flat 27% off',
      details:'Price match within 48 hours of order confirmationPrice match',
      review3:'This review is helpful',
      votes:'10 Votes',
    },
    {
      title:'Adam Levine',
      date:'19 Dec, 2020 - Solo Traveller',
      title2:'One of the amazing Trip',
      review:'Reviewed:',
      review2:'Kudremukh Trek, Chikmagalur | Book @ Flat 27% off',
      details:'Price match within 48 hours of order confirmationPrice match',
      review3:'This review is helpful',
      votes:'10 Votes',
    },
  ];
  landingPage: any;
  
  constructor(
    private landingPageService : LandingPageService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(param => {
      const handle = param.handle;
      console.log(handle);
      this.landingPageService.getLandingPageByHandle(handle).then((page: any) => {
        this.landingPage = page;
        console.log(this.landingPage);
        this.landingPage.section = this.landingPage.section.sort((a: any, b: any) => a.position - b.position)
      });
    })
  }

  ngOnInit(): void {
    
  }

}
