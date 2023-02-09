import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTablesStudentDisplayComponent } from './general-tables-student-display.component';

describe('GeneralTablesStudentDisplayComponent', () => {
  let component: GeneralTablesStudentDisplayComponent;
  let fixture: ComponentFixture<GeneralTablesStudentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTablesStudentDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTablesStudentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
