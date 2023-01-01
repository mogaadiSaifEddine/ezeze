import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChangeComponent } from './delete-change.component';

describe('DeleteChangeComponent', () => {
  let component: DeleteChangeComponent;
  let fixture: ComponentFixture<DeleteChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChangeComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
