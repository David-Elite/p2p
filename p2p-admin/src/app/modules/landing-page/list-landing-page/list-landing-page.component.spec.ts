import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandingPageComponent } from './list-landing-page.component';

describe('ListLandingPageComponent', () => {
  let component: ListLandingPageComponent;
  let fixture: ComponentFixture<ListLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
