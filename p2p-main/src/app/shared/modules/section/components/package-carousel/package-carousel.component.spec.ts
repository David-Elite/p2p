import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCarouselComponent } from './package-carousel.component';

describe('PackageCarouselComponent', () => {
  let component: PackageCarouselComponent;
  let fixture: ComponentFixture<PackageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
