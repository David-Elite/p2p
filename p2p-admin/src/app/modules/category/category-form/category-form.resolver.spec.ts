import { TestBed } from '@angular/core/testing';

import { CategoryFormResolver } from './category-form.resolver';

describe('CategoryFormResolver', () => {
  let resolver: CategoryFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoryFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
