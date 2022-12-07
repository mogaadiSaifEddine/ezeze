import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterWrapperComponent } from './toaster-wrapper.component';

describe('ToasterWrapperComponent', () => {
  let component: ToasterWrapperComponent;
  let fixture: ComponentFixture<ToasterWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToasterWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToasterWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
