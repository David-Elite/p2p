import { Component, OnInit, Input } from '@angular/core';
import { LandingPageService } from '../../landing-page.service';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent implements OnInit {
@Input() sectionId = '';
@Input() pageId = '';
section: any;
  constructor(
    private landingPageService: LandingPageService
  ) {
    
  }

  ngOnInit(): void {
    this.landingPageService.getSection(this.pageId, this.sectionId).then(sec => {
      this.section = sec;
      console.log(this.section);
    });
  }

}
