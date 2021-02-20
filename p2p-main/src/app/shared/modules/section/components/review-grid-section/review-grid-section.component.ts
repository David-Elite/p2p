import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-grid-section',
  templateUrl: './review-grid-section.component.html',
  styleUrls: ['./review-grid-section.component.scss']
})
export class ReviewGridSectionComponent implements OnInit {
@Input() title = '';
@Input() review:any[] = []; 

  constructor() { }

  ngOnInit(): void {
  }

}
