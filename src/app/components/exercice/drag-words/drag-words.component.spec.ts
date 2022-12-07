import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragWordsComponent } from './drag-words.component';

describe('DragWordsComponent', () => {
  let component: DragWordsComponent;
  let fixture: ComponentFixture<DragWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
