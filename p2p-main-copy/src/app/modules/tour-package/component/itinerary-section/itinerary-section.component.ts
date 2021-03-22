import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itinerary-section',
  templateUrl: './itinerary-section.component.html',
  styleUrls: ['./itinerary-section.component.scss']
})
export class ItinerarySectionComponent implements OnInit {
@Input() itinerary:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
