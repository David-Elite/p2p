import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-location-box-section',
  templateUrl: './location-box-section.component.html',
  styleUrls: ['./location-box-section.component.scss']
})
export class LocationBoxSectionComponent implements OnInit {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() locationBox:any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
