import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokeAnswerDisplayComponent } from './stroke-answer-display.component';

describe('StrokeAnswerDisplayComponent', () => {
  let component: StrokeAnswerDisplayComponent;
  let fixture: ComponentFixture<StrokeAnswerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrokeAnswerDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrokeAnswerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
