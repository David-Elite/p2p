import { TestBed } from '@angular/core/testing';

import { TourPackageResolver } from './tour-package.resolver';

describe('TourPackageResolver', () => {
  let resolver: TourPackageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TourPackageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
