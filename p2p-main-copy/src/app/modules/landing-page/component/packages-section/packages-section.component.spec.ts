import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesSectionComponent } from './packages-section.component';

describe('PackagesSectionComponent', () => {
  let component: PackagesSectionComponent;
  let fixture: ComponentFixture<PackagesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
