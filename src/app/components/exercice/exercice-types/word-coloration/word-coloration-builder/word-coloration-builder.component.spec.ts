import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordColorationBuilderComponent } from './word-coloration-builder.component';

describe('WordColorationBuilderComponent', () => {
  let component: WordColorationBuilderComponent;
  let fixture: ComponentFixture<WordColorationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordColorationBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordColorationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
