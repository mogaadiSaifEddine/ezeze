import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUnderImageBuilderComponent } from './text-under-image-builder.component';

describe('TextUnderImageBuilderComponent', () => {
  let component: TextUnderImageBuilderComponent;
  let fixture: ComponentFixture<TextUnderImageBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextUnderImageBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextUnderImageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
