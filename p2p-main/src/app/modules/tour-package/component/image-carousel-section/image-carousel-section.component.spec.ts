import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarouselSectionComponent } from './image-carousel-section.component';

describe('ImageCarouselSectionComponent', () => {
  let component: ImageCarouselSectionComponent;
  let fixture: ComponentFixture<ImageCarouselSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCarouselSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
