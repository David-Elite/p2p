import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent implements OnInit {
// @Input() title='';
@Input() para1='';
@Input() para2='';
@Input() metaTitle='';

  constructor() { }

  ngOnInit(): void {
  }

}
