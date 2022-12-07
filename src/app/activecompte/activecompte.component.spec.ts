import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivecompteComponent } from './activecompte.component';

describe('ActivecompteComponent', () => {
  let component: ActivecompteComponent;
  let fixture: ComponentFixture<ActivecompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivecompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivecompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
