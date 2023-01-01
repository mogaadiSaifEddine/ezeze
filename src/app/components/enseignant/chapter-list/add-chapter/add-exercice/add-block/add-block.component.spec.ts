import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockComponent } from './add-block.component';

describe('AddBlockComponent', () => {
  let component: AddBlockComponent;
  let fixture: ComponentFixture<AddBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlockComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
