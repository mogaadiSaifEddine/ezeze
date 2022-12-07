import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReminderComponent } from './course-reminder.component';

describe('CourseReminderComponent', () => {
  let component: CourseReminderComponent;
  let fixture: ComponentFixture<CourseReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseReminderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
