import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGridSectionComponent } from './review-grid-section.component';

describe('ReviewGridSectionComponent', () => {
  let component: ReviewGridSectionComponent;
  let fixture: ComponentFixture<ReviewGridSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewGridSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGridSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
