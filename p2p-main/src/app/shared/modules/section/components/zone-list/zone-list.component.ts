import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {
  @Input() section: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.section);
  }

  getZoneGrid(parent: string | null): any[] {
    return this.section.zones.filter((z: any) => z.parent === parent);
  }

}
