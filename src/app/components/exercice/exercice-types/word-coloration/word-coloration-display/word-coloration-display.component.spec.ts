import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordColorationDisplayComponent } from './word-coloration-display.component';

describe('WordColorationDisplayComponent', () => {
  let component: WordColorationDisplayComponent;
  let fixture: ComponentFixture<WordColorationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordColorationDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordColorationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
