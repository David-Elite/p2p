import { TestBed } from '@angular/core/testing';

import { ListReviewResolver } from './list-review.resolver';

describe('ListReviewResolver', () => {
  let resolver: ListReviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListReviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
