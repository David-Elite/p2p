import { TestBed } from '@angular/core/testing';

import { PageFormResolver } from './page-form.resolver';

describe('PageFormResolver', () => {
  let resolver: PageFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PageFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
