import { TestBed } from '@angular/core/testing';

import { BlogFormResolver } from './blog-form.resolver';

describe('BlogFormResolver', () => {
  let resolver: BlogFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BlogFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
