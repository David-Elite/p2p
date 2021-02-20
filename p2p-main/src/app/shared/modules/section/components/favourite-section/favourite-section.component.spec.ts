import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteSectionComponent } from './favourite-section.component';

describe('FavouriteSectionComponent', () => {
  let component: FavouriteSectionComponent;
  let fixture: ComponentFixture<FavouriteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
