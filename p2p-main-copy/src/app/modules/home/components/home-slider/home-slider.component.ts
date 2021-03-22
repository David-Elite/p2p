import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
@Input() title='';
@Input() subtitle='';
@Input() headerContent:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
