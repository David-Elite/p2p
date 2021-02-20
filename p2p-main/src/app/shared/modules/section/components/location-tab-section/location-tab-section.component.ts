import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-tab-section',
  templateUrl: './location-tab-section.component.html',
  styleUrls: ['./location-tab-section.component.scss']
})
export class LocationTabSectionComponent implements OnInit {
@Input() location:any[] = [];
@Input() link:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
