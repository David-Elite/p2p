import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminuserComponent } from './list-admin-user.component';

describe('ListAdminuserComponent', () => {
  let component: ListAdminuserComponent;
  let fixture: ComponentFixture<ListAdminuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdminuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
