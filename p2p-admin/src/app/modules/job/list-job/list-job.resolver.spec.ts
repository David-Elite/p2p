import { TestBed } from '@angular/core/testing';

import { ListJobResolver } from './list-job.resolver';

describe('ListJobResolver', () => {
  let resolver: ListJobResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListJobResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
