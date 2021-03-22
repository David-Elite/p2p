import { TestBed } from '@angular/core/testing';

import { BlogListResolver } from './blog-list.resolver';

describe('BlogListResolver', () => {
  let resolver: BlogListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BlogListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
