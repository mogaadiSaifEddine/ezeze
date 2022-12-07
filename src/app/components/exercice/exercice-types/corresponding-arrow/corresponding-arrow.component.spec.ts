import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondingArrowComponent } from './corresponding-arrow.component';

describe('CorrespondingArrowComponent', () => {
  let component: CorrespondingArrowComponent;
  let fixture: ComponentFixture<CorrespondingArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrespondingArrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondingArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
