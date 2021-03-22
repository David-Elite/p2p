import { TestBed } from '@angular/core/testing';

import { ListBlogResolver } from './list-blog.resolver';

describe('ListBlogResolver', () => {
  let resolver: ListBlogResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListBlogResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
