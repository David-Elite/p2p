import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-blog-grid-section',
  templateUrl: './blog-grid-section.component.html',
  styleUrls: ['./blog-grid-section.component.scss']
})
export class BlogGridSectionComponent implements OnInit {
@Input() title='';
@Input() subTitle='';
@Input() blog:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
