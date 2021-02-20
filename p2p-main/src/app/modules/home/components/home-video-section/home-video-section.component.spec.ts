import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVideoSectionComponent } from './home-video-section.component';

describe('HomeVideoSectionComponent', () => {
  let component: HomeVideoSectionComponent;
  let fixture: ComponentFixture<HomeVideoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVideoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVideoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
