import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillLettersComponent } from './fill-letters.component';

describe('FillLettersComponent', () => {
  let component: FillLettersComponent;
  let fixture: ComponentFixture<FillLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillLettersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
