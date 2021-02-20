import { TestBed } from '@angular/core/testing';

import { ListAdminuserResolver } from './list-admin-user.resolver';

describe('ListAdminuserResolver', () => {
  let resolver: ListAdminuserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAdminuserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
