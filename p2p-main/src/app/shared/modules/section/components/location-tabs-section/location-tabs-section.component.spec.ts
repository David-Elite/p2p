import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTabsSectionComponent } from './location-tabs-section.component';

describe('LocationTabsSectionComponent', () => {
  let component: LocationTabsSectionComponent;
  let fixture: ComponentFixture<LocationTabsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTabsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTabsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
