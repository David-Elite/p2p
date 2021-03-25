import { TestBed } from '@angular/core/testing';

import { ListUserResolver } from './list-user.resolver';

describe('ListUserResolver', () => {
  let resolver: ListUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
