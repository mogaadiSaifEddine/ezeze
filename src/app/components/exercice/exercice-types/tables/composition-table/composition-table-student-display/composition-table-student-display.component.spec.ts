import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionTableStudentDisplayComponent } from './composition-table-student-display.component';

describe('CompositionTableStudentDisplayComponent', () => {
  let component: CompositionTableStudentDisplayComponent;
  let fixture: ComponentFixture<CompositionTableStudentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionTableStudentDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositionTableStudentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
