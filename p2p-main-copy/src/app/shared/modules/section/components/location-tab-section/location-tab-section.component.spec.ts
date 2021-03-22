import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTabSectionComponent } from './location-tab-section.component';

describe('LocationTabSectionComponent', () => {
  let component: LocationTabSectionComponent;
  let fixture: ComponentFixture<LocationTabSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTabSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTabSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
