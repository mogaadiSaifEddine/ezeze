import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphDisplayComponent } from './paragraph-display.component';

describe('ParagraphDisplayComponent', () => {
  let component: ParagraphDisplayComponent;
  let fixture: ComponentFixture<ParagraphDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
