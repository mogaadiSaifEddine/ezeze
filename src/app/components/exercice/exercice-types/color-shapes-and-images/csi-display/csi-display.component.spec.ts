import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiDisplayComponent } from './csi-display.component';

describe('CsiDisplayComponent', () => {
  let component: CsiDisplayComponent;
  let fixture: ComponentFixture<CsiDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsiDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsiDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
