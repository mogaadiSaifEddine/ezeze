import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathStringDisplayComponent } from './math-string-display.component';

describe('MathStringDisplayComponent', () => {
  let component: MathStringDisplayComponent;
  let fixture: ComponentFixture<MathStringDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathStringDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathStringDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
