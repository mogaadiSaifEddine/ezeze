import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphBuilderComponent } from './paragraph-builder.component';

describe('ParagraphBuilderComponent', () => {
  let component: ParagraphBuilderComponent;
  let fixture: ComponentFixture<ParagraphBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
