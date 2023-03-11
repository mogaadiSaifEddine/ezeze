import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNotFoundComponent } from './exercise-not-found.component';

describe('ExerciseNotFoundComponent', () => {
  let component: ExerciseNotFoundComponent;
  let fixture: ComponentFixture<ExerciseNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
