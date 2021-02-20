import { TestBed } from '@angular/core/testing';

import { AdminuserService } from './admin-user.service';

describe('AdminuserService', () => {
  let service: AdminuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
