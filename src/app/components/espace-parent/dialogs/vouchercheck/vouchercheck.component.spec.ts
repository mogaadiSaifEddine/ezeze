import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchercheckComponent } from './vouchercheck.component';

describe('VouchercheckComponent', () => {
  let component: VouchercheckComponent;
  let fixture: ComponentFixture<VouchercheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchercheckComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VouchercheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
