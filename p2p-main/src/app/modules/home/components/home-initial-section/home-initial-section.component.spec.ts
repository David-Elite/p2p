import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInitialSectionComponent } from './home-initial-section.component';

describe('HomeInitialSectionComponent', () => {
  let component: HomeInitialSectionComponent;
  let fixture: ComponentFixture<HomeInitialSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeInitialSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInitialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
