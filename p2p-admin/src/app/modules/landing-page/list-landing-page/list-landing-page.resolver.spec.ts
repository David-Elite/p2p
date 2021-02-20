import { TestBed } from '@angular/core/testing';

import { ListLandingPageResolver } from './list-landing-page.resolver';

describe('ListLandingPageResolver', () => {
  let resolver: ListLandingPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListLandingPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
