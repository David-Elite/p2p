import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBoxSectionComponent } from './location-box-section.component';

describe('LocationBoxSectionComponent', () => {
  let component: LocationBoxSectionComponent;
  let fixture: ComponentFixture<LocationBoxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationBoxSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBoxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
