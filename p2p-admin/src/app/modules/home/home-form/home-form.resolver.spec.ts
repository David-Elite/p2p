import { TestBed } from '@angular/core/testing';

import { HomeFormResolver } from './home-form.resolver';

describe('HomeFormResolver', () => {
  let resolver: HomeFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomeFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
