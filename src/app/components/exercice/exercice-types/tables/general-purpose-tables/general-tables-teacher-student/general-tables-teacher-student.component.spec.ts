import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTablesTeacherStudentComponent } from './general-tables-teacher-student.component';

describe('GeneralTablesTeacherStudentComponent', () => {
  let component: GeneralTablesTeacherStudentComponent;
  let fixture: ComponentFixture<GeneralTablesTeacherStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTablesTeacherStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTablesTeacherStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
