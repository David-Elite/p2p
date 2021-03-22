import { TestBed } from '@angular/core/testing';

import { SearchResolver } from './search.resolver';

describe('SearchResolver', () => {
  let resolver: SearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
