import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUnderImageComponent } from './text-under-image.component';

describe('TextUnderImageComponent', () => {
  let component: TextUnderImageComponent;
  let fixture: ComponentFixture<TextUnderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextUnderImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextUnderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
