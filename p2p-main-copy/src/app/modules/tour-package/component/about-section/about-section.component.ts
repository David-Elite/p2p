import { Component, OnInit, Input } from '@angular/core';
import { TourPackageResolver } from '../../tour-package.resolver';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent implements OnInit {
// @Input() title='';
@Input() para1='';
@Input() para2='';
@Input() metaTitle='';
package: any;
  constructor(
    private tourPackageResolver: TourPackageResolver
  ) {
    this.tourPackageResolver.package.subscribe(pkg => this.package = pkg);
  }

  ngOnInit(): void {
  }

}
