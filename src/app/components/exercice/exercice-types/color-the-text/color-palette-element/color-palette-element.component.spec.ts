import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteElementComponent } from './color-palette-element.component';

describe('ColorPaletteElementComponent', () => {
  let component: ColorPaletteElementComponent;
  let fixture: ComponentFixture<ColorPaletteElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPaletteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
