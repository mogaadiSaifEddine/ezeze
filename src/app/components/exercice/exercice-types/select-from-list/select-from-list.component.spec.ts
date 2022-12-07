import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFromListComponent } from './select-from-list.component';

describe('SelectFromListComponent', () => {
  let component: SelectFromListComponent;
  let fixture: ComponentFixture<SelectFromListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFromListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
