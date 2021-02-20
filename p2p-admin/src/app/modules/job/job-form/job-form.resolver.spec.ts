import { TestBed } from '@angular/core/testing';

import { JobFormResolver } from './job-form.resolver';

describe('JobFormResolver', () => {
  let resolver: JobFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
