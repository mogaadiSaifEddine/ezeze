import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAnswersComponent } from './multiple-answers.component';

describe('MultipleAnswersComponent', () => {
  let component: MultipleAnswersComponent;
  let fixture: ComponentFixture<MultipleAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAnswersComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultipleAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
