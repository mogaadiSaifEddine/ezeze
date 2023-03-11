import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragImgWordComponent } from './drag-img-word.component';

describe('DragImgWordComponent', () => {
  let component: DragImgWordComponent;
  let fixture: ComponentFixture<DragImgWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragImgWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragImgWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
