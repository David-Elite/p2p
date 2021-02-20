import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent implements OnInit {
@Input() title='';
@Input() paragraph='';
@Input() title2='';
@Input() tabledata:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
