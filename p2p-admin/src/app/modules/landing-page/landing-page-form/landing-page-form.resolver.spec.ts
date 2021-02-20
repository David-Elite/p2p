import { TestBed } from '@angular/core/testing';

import { LandingPageFormResolver } from './landing-page-form.resolver';

describe('LandingPageFormResolver', () => {
  let resolver: LandingPageFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LandingPageFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
