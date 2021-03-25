import { TestBed } from '@angular/core/testing';

import { UserFormResolver } from './user-form.resolver';

describe('UserFormResolver', () => {
  let resolver: UserFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
