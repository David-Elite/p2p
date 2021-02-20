import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partners-grid-section',
  templateUrl: './partners-grid-section.component.html',
  styleUrls: ['./partners-grid-section.component.scss']
})
export class PartnersGridSectionComponent implements OnInit {
@Input() title = '';
@Input() subTitle = '';
@Input() partners:any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
