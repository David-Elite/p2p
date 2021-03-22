import { Component, OnInit } from '@angular/core';
import { PageResolver } from './page.resolver';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: any;
  constructor(
    private pageResolver: PageResolver
  ) { }

  ngOnInit(): void {
    this.pageResolver.page.subscribe(pg => this.page = pg);
  }

}
