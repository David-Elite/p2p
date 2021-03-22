import { Component, OnInit } from '@angular/core';
import { CareerResolver } from '../career.resolver';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  jobs: any[] = [];
  constructor(
    private careerResolver: CareerResolver
  ) { }

  ngOnInit(): void {
    this.careerResolver.jobs.subscribe(
      {
        next: (res) => this.jobs = res,
        error: (err) => {}
      }
    );
  }

}
