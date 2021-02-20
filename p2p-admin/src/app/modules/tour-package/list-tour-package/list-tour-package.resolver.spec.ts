import { TestBed } from '@angular/core/testing';

import { ListTourPackageResolver } from './list-tour-package.resolver';

describe('ListTourPackageResolver', () => {
  let resolver: ListTourPackageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListTourPackageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
