import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalfoulComponent } from './falfoul.component';

describe('FalfoulComponent', () => {
  let component: FalfoulComponent;
  let fixture: ComponentFixture<FalfoulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalfoulComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FalfoulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
