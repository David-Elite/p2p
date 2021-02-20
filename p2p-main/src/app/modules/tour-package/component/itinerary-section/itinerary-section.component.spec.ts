import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarySectionComponent } from './itinerary-section.component';

describe('ItinerarySectionComponent', () => {
  let component: ItinerarySectionComponent;
  let fixture: ComponentFixture<ItinerarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinerarySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
