import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-packages-section',
  templateUrl: './packages-section.component.html',
  styleUrls: ['./packages-section.component.scss']
})
export class PackagesSectionComponent implements OnInit {
@Input() title='';
@Input() comparePrice='';
@Input() price='';
@Input() packages:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
