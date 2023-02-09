import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionTableBuilderComponent } from './composition-table-builder.component';

describe('CompositionTableBuilderComponent', () => {
  let component: CompositionTableBuilderComponent;
  let fixture: ComponentFixture<CompositionTableBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionTableBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositionTableBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
