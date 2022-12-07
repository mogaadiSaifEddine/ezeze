import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTheTextElementComponent } from './color-the-text-element.component';

describe('ColorTheTextElementComponent', () => {
  let component: ColorTheTextElementComponent;
  let fixture: ComponentFixture<ColorTheTextElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorTheTextElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorTheTextElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
