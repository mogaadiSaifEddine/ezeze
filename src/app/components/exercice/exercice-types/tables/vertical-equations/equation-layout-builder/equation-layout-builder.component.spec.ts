import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationLayoutBuilderComponent } from './equation-layout-builder.component';

describe('EquationLayoutBuilderComponent', () => {
  let component: EquationLayoutBuilderComponent;
  let fixture: ComponentFixture<EquationLayoutBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquationLayoutBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquationLayoutBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
