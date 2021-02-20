import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserFormComponent } from './adminuser-form.component';

describe('AdminuserFormComponent', () => {
  let component: AdminuserFormComponent;
  let fixture: ComponentFixture<AdminuserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
