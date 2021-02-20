import { TestBed } from '@angular/core/testing';

import { ReviewFormResolver } from './review-form.resolver';

describe('ReviewFormResolver', () => {
  let resolver: ReviewFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReviewFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
