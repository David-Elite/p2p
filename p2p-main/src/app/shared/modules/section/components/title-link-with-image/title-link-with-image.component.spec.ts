import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleLinkWithImageComponent } from './title-link-with-image.component';

describe('TitleLinkWithImageComponent', () => {
  let component: TitleLinkWithImageComponent;
  let fixture: ComponentFixture<TitleLinkWithImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleLinkWithImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleLinkWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
