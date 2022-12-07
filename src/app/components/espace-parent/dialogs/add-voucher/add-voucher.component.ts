import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICES
import { SharedService } from 'src/app/services/shared.service';
import { CouponsService } from 'src/app/services/coupons.service';
// COMPONENTS
import { AddNewComponent } from '../student-forms/add-new/add-new.component';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent implements OnInit {
  tokenForm: FormGroup;
  isLinear = true;
  tokenIsBeingChecked = false;
  tokenIsValid = false;
  showError = false;
  userID = JSON.parse(localStorage.getItem('user_details')).user_id;

  constructor(
    private dialogRef: MatDialogRef<AddVoucherComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private couponService: CouponsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // ############################### FIRST STEP ###############################

  initializeForm() {
    this.tokenForm = this.fb.group({
      token: [null, Validators.required]
    });
  }
  public get getTokenInput() {
    return this.tokenForm.get('token');
  }
  // === DIALOG ACTIONS
  close() {
    this.dialogRef.close();
  }
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
                  this.isLinear = false;
                  this.showError = false;
                  this.tokenIsBeingChecked = false;
                  this.tokenIsValid = true;
                  this.tokenForm.get('token').disable();
                }
              });
            } else if (response.parent?.user_id === this.userID) {
              this.sharedService.currentToken = typedInToken;
              this.isLinear = false;
              this.showError = false;
              this.tokenIsBeingChecked = false;
              this.tokenIsValid = true;
              this.tokenForm.get('token').disable();
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

  // ############################### SECOND STEP ###############################
  openAddStudentDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(AddNewComponent);
    dialogRef.afterClosed().subscribe();
  }
  showManageStudentAccountGuide() {
    this.dialogRef.close();
    this.sharedService.showManageStudentAccountGuide.next(true);
  }
}
