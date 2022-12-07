import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceenseignantComponent } from './espaceenseignant.component';

describe('EspaceenseignantComponent', () => {
  let component: EspaceenseignantComponent;
  let fixture: ComponentFixture<EspaceenseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceenseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceenseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
