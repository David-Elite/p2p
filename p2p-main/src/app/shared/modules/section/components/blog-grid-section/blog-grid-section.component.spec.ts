import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGridSectionComponent } from './blog-grid-section.component';

describe('BlogGridSectionComponent', () => {
  let component: BlogGridSectionComponent;
  let fixture: ComponentFixture<BlogGridSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogGridSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogGridSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
