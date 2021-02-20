import { TestBed } from '@angular/core/testing';

import { ZoneFormResolver } from './zone-form.resolver';

describe('ZoneFormResolver', () => {
  let resolver: ZoneFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ZoneFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
