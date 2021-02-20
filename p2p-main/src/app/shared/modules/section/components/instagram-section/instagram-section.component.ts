import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-instagram-section',
  templateUrl: './instagram-section.component.html',
  styleUrls: ['./instagram-section.component.scss']
})
export class InstagramSectionComponent implements OnInit {
@Input() title = '';
@Input() subTitle = '';
@Input() instagram :any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
