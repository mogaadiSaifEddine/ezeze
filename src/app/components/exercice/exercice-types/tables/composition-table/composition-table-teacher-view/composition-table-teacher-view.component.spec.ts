import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionTableTeacherViewComponent } from './composition-table-teacher-view.component';

describe('CompositionTableTeacherViewComponent', () => {
  let component: CompositionTableTeacherViewComponent;
  let fixture: ComponentFixture<CompositionTableTeacherViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionTableTeacherViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositionTableTeacherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
