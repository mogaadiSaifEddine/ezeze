import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquiredContentEvaluationComponent } from './aquired-content-evaluation.component';

describe('AquiredContentEvaluationComponent', () => {
  let component: AquiredContentEvaluationComponent;
  let fixture: ComponentFixture<AquiredContentEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquiredContentEvaluationComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AquiredContentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
