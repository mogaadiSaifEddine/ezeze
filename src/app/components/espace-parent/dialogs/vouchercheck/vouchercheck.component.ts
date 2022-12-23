import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { SharedService } from 'src/app/services/shared.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { AddNewComponent } from '../student-forms/add-new/add-new.component';


@Component({
  selector: 'app-vouchercheck',
  templateUrl: './vouchercheck.component.html',
  styleUrls: ['./vouchercheck.component.scss']
})
export class VouchercheckComponent implements OnInit {

  tokenForm: FormGroup;
  tokenIsBeingChecked = false;
  tokenIsValid = false;
  showError = false;
  userID = JSON.parse(localStorage.getItem('user_details')).user_id;

  constructor(
    private dialogRef: MatDialogRef<VouchercheckComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private couponService: CouponsService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  // ====== FORM ======
  initializeForm() {
    this.tokenForm = this.fb.group({
      token: [null, Validators.required]
    });
  }
  public get getTokenInput() {
    return this.tokenForm.get('token');
  }

  // ====== TOKEN =======
  verifyToken() {
    // VERIFICATOIN LOGIC HERE
    this.tokenIsBeingChecked = true;
    const typedInToken = this.tokenForm.get('token').value;
    this.couponService?.verifyCoupon(typedInToken).subscribe({
      next: (response: any) => {
        if (response !== null) {
          // IF VALID, Proceed
          if (response.usedUsersNumber <= response.numberUsers) {
            this.sharedService.currentTokenData = response;
            this.sharedService.currentCount = response.usedUsersNumber;
            if (response.parent === null) {
              // token haven't been claimed, redeem it
              this.couponService.redeemCoupon(typedInToken, this.userID).subscribe({
                next: (value: any) => {
                  this.sharedService.currentToken = value.value;
                  this.showError = false;
                  this.tokenIsBeingChecked = false;
                  this.tokenIsValid = true;
                  this.tokenForm.get('token').disable();
                  this.dialogRef.close("valid");
                  this.dialog.open(AddNewComponent);
                }
              });
            } else if (response.parent?.user_id === this.userID) {
              this.sharedService.currentToken = typedInToken;
              this.showError = false;
              this.tokenIsBeingChecked = false;
              this.tokenIsValid = true;
              this.tokenForm.get('token').disable();
              this.dialogRef.close("valid");
              this.dialog.open(AddNewComponent);

            } else {
              this.tokenIsBeingChecked = false;
              this.tokenIsValid = false;
              this.showError = true;
            }
          }
        } else {
          this.tokenIsBeingChecked = false;
          this.tokenIsValid = false;
          this.showError = true;
        }
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
