import { TestBed } from '@angular/core/testing';

import { AdminuserFormResolver } from './admin-user-form.resolver';

describe('AdminuserFormResolver', () => {
  let resolver: AdminuserFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminuserFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
