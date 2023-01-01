import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertScaleComponent } from './likert-scale.component';

describe('LikertScaleComponent', () => {
  let component: LikertScaleComponent;
  let fixture: ComponentFixture<LikertScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikertScaleComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LikertScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
