import { TestBed } from '@angular/core/testing';

import { TourPackageFormResolver } from './tour-package-form.resolver';

describe('TourPackageFormResolver', () => {
  let resolver: TourPackageFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TourPackageFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
