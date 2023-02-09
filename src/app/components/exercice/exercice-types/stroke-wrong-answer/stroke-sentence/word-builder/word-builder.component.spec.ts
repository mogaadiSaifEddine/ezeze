import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBuilderComponent } from './word-builder.component';

describe('WordBuilderComponent', () => {
  let component: WordBuilderComponent;
  let fixture: ComponentFixture<WordBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
