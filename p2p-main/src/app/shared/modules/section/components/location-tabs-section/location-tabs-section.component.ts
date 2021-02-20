import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-location-tabs-section',
  templateUrl: './location-tabs-section.component.html',
  styleUrls: ['./location-tabs-section.component.scss']
})
export class LocationTabsSectionComponent implements OnInit {
  @Input() locationTab:any[] = [];
  @Input() title='';
  @Input() subTitle='';
  @Input() locationDetails:any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
