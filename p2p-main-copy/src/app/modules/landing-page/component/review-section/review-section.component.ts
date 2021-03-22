import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnInit {
@Input() review:any [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
