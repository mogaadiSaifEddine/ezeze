import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADDchapitreComponent } from './addchapitre.component';

describe('ADDchapitreComponent', () => {
  let component: ADDchapitreComponent;
  let fixture: ComponentFixture<ADDchapitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADDchapitreComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ADDchapitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
