import { Component, OnInit, Input } from '@angular/core';
import { LandingPageService } from '../../landing-page.service';

@Component({
  selector: 'app-packages-section',
  templateUrl: './packages-section.component.html',
  styleUrls: ['./packages-section.component.scss']
})
export class PackagesSectionComponent implements OnInit {
  @Input() pageId = '';
  @Input() sectionId = '';
  section: any;

  constructor(
    private landingPageService: LandingPageService
  ) { }

  ngOnInit(): void {
    this.landingPageService.getSection(this.pageId, this.sectionId).then(section => this.section = section);
  }
}

