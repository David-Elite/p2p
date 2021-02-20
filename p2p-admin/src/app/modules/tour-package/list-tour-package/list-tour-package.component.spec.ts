import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTourPackageComponent } from './list-tour-package.component';

describe('ListTourPackageComponent', () => {
  let component: ListTourPackageComponent;
  let fixture: ComponentFixture<ListTourPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTourPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
