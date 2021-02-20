import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackageFormComponent } from './tour-package-form.component';

describe('TourPackageFormComponent', () => {
  let component: TourPackageFormComponent;
  let fixture: ComponentFixture<TourPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPackageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
