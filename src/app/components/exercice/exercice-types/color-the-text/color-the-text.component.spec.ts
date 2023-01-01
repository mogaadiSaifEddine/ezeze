import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTheTextComponent } from './color-the-text.component';

describe('ColorTheTextComponent', () => {
  let component: ColorTheTextComponent;
  let fixture: ComponentFixture<ColorTheTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorTheTextComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ColorTheTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
