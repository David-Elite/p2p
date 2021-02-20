import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  ]

  locationCarousel = [
    {
      title:'Asia'
    },
    {
      title:'Asia'
    },
    {
      title:'Asia'
    },
    {
      title:'Asia'
    },
    {
      title:'Asia'
    },
  ];

  locationTab = [
    {
      title:'Rajasthan'
    },
    {
      title:'Bangalore'
    },
    {
      title:'Hyderabad'
    },
    {
      title:'Mumbai'
    },
    {
      title:'Shimla'
    },
    {
      title:'Manali'
    },
  ];
  locationDetails =[
    {
      title:'Jaipur',
      price:'Starts ₹ 500'
    },
    {
      title:'Jaipur',
      price:'Starts ₹ 500'
    },
    {
      title:'Jaipur',
      price:'Starts ₹ 500'
    },
    {
      title:'Jaipur',
      price:'Starts ₹ 500'
    },
    {
      title:'Jaipur',
      price:'Starts ₹ 500'
    },
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

  review = [
    {
      title:'Adam Levine',
      subTitle:'19 Dec, 2020 - Solo Traveller',
      para:'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
    {
      title:'Adam Levine',
      subTitle:'19 Dec, 2020 - Solo Traveller',
      para:'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
    {
      title:'Adam Levine',
      subTitle:'19 Dec, 2020 - Solo Traveller',
      para:'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
    {
      title:'Adam Levine',
      subTitle:'19 Dec, 2020 - Solo Traveller',
      para:'Price match within 48 hours of order confirmationPrice match within 48 hours of order confirmationPrice match within 48 hours of order confirmation',
    },
  ];

  partners = [
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    },
    {
      image: 'assets/img/tripadvisor.png'
    }
  ];

  instagram = [
    {
      image:'assets/img/jonatan-pie-1hpE3fROU0I-unsplash.png'
    },
    {
      image:'assets/img/jonatan-pie-1hpE3fROU0I-unsplash.png'
    },
    {
      image:'assets/img/jonatan-pie-1hpE3fROU0I-unsplash.png'
    },
    {
      image:'assets/img/jonatan-pie-1hpE3fROU0I-unsplash.png'
    },
  ];

  favourite = [
    {
      title: 'CORPORATE'
    },
    {
      title: 'CORPORATE'
    },
    {
      title: 'CORPORATE'
    },
    {
      title: 'CORPORATE'
    },
    {
      title: 'CORPORATE'
    },
  ];

headerContent = [
  {
    title:'BEACH',
  },
  {
    title:'BUNGEE JUMP',
  },
  {
    title:'CITY TOURS',
  },
  {
    title:'HIKING TRIPS',
  },
  {
    title:'JUNGLE',
  },
  {
    title:'SCUBA DIVING',
  },
  {
    title:'SAFARI',
  },
  {
    title:'SNOW & ICE',
  },
]
  constructor() { }

  ngOnInit(): void {
  }

}
