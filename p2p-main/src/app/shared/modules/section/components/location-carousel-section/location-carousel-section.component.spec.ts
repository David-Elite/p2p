import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCarouselSectionComponent } from './location-carousel-section.component';

describe('LocationCarouselSectionComponent', () => {
  let component: LocationCarouselSectionComponent;
  let fixture: ComponentFixture<LocationCarouselSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationCarouselSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
