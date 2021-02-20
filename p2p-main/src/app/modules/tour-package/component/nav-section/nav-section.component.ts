import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-section',
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.scss']
})
export class NavSectionComponent implements OnInit {
@Input() price1="";
@Input() price2="";
// @Input() nav:any[] = [];
@Input() title='';
@Input() review:any[] = [];
  constructor() {
 
   }


  ngOnInit(): void {

  }


}
