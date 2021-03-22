import { TestBed } from '@angular/core/testing';

import { CareerResolver } from './career.resolver';

describe('CareerResolver', () => {
  let resolver: CareerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CareerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
