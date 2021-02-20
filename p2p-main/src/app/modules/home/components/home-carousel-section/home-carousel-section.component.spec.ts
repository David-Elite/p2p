import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselSectionComponent } from './home-carousel-section.component';

describe('HomeCarouselSectionComponent', () => {
  let component: HomeCarouselSectionComponent;
  let fixture: ComponentFixture<HomeCarouselSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarouselSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
