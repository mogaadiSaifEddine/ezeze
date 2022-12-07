import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillEmptyFieldsComponent } from './fill-empty-fields.component';

describe('FillEmptyFieldsComponent', () => {
  let component: FillEmptyFieldsComponent;
  let fixture: ComponentFixture<FillEmptyFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillEmptyFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillEmptyFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
