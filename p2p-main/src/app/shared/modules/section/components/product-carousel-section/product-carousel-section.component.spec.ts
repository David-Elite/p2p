import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarouselSectionComponent } from './product-carousel-section.component';

describe('ProductCarouselSectionComponent', () => {
  let component: ProductCarouselSectionComponent;
  let fixture: ComponentFixture<ProductCarouselSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCarouselSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
