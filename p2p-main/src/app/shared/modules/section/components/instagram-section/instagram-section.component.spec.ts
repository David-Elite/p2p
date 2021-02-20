import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramSectionComponent } from './instagram-section.component';

describe('InstagramSectionComponent', () => {
  let component: InstagramSectionComponent;
  let fixture: ComponentFixture<InstagramSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
