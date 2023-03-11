import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathStringBuilderComponent } from './math-string-builder.component';

describe('MathStringBuilderComponent', () => {
  let component: MathStringBuilderComponent;
  let fixture: ComponentFixture<MathStringBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathStringBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathStringBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
