import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitEquationFormComponent } from './init-equation-form.component';

describe('InitEquationFormComponent', () => {
  let component: InitEquationFormComponent;
  let fixture: ComponentFixture<InitEquationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitEquationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitEquationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
