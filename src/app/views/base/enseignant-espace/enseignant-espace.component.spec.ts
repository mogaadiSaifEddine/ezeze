import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantEspaceComponent } from './enseignant-espace.component';

describe('EnseignantEspaceComponent', () => {
  let component: EnseignantEspaceComponent;
  let fixture: ComponentFixture<EnseignantEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantEspaceComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EnseignantEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
