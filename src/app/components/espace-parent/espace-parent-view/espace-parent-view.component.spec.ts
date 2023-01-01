import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceParentViewComponent } from './espace-parent-view.component';

describe('EspaceParentViewComponent', () => {
  let component: EspaceParentViewComponent;
  let fixture: ComponentFixture<EspaceParentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceParentViewComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EspaceParentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
