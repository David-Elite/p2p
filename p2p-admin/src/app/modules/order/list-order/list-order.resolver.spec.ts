import { TestBed } from '@angular/core/testing';

import { ListOrderResolver } from './list-order.resolver';

describe('ListOrderResolver', () => {
  let resolver: ListOrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListOrderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
