import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLinkSliderComponent } from './simple-link-slider.component';

describe('SimpleLinkSliderComponent', () => {
  let component: SimpleLinkSliderComponent;
  let fixture: ComponentFixture<SimpleLinkSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleLinkSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleLinkSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
