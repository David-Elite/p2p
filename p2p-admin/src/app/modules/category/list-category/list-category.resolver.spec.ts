import { TestBed } from '@angular/core/testing';

import { ListCategoryResolver } from './list-category.resolver';

describe('ListCategoryResolver', () => {
  let resolver: ListCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
