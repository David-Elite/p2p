import { TestBed } from '@angular/core/testing';

import { TourPackageService } from './tour-package.service';

describe('TourPackageService', () => {
  let service: TourPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
