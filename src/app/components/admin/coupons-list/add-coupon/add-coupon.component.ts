import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CouponType, State } from 'src/app/model/Coupon';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  couponForm: FormGroup;
  COUPON_TYPE = CouponType;
  state = State;
  get CouponFormControls() {
    return this.couponForm.controls;
  }
  constructor(private fb: FormBuilder, private couponsService: CouponsService, private dialogRef: MatDialogRef<AddCouponComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.couponForm = this.fb.group({
      couponType: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
      numberOfRows: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.couponForm.valid)
      this.couponsService.addCoupons(this.couponForm.value).subscribe((res) => {
        this.dialogRef.close(true);
      });
  }
}
