import { TestBed } from '@angular/core/testing';

import { OrderFormResolver } from './order-form.resolver';

describe('OrderFormResolver', () => {
  let resolver: OrderFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
