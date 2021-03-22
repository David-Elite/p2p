import { TestBed } from '@angular/core/testing';

import { ListPageResolver } from './list-page.resolver';

describe('ListPageResolver', () => {
  let resolver: ListPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
