import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersGridSectionComponent } from './partners-grid-section.component';

describe('PartnersGridSectionComponent', () => {
  let component: PartnersGridSectionComponent;
  let fixture: ComponentFixture<PartnersGridSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersGridSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersGridSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
