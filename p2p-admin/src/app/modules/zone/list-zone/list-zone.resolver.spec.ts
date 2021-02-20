import { TestBed } from '@angular/core/testing';

import { ListZoneResolver } from './list-zone.resolver';

describe('ListZoneResolver', () => {
  let resolver: ListZoneResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListZoneResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
