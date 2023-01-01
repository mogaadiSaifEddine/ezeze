import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterExcerciceComponent } from './ajouter-excercice.component';

describe('AjouterExcerciceComponent', () => {
  let component: AjouterExcerciceComponent;
  let fixture: ComponentFixture<AjouterExcerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterExcerciceComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AjouterExcerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
