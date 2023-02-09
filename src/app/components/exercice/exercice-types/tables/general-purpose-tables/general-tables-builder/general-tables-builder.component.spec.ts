import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTablesBuilderComponent } from './general-tables-builder.component';

describe('GeneralTablesBuilderComponent', () => {
  let component: GeneralTablesBuilderComponent;
  let fixture: ComponentFixture<GeneralTablesBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTablesBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTablesBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
