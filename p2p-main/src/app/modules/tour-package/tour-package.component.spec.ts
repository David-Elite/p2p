import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackageComponent } from './tour-package.component';

describe('TourPackageComponent', () => {
  let component: TourPackageComponent;
  let fixture: ComponentFixture<TourPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
