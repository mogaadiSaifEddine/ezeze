import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Inject } from '@angular/core';
import * as moment from 'moment';
// COMPONENTS
import { UserService } from 'src/app/services/userservice.service';
import { StudentService } from 'src/app/services/espace-parent/student.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent implements OnInit {
  studentForm: FormGroup;
  dialogAction = null;
  viewNotEditMode = true;
  student = null;
  schoolsList = null;
  groupsList = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<ViewEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private studentService: StudentService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getDBData();
    this.dialogAction = this.data.at;

    if (this.dialogAction === 'update') this.viewNotEditMode = false;

    if (this.dialogAction === 'view') this.viewNotEditMode = true;

    this.initForm();
  }

  getDBData() {
    this.getSchoolsList();
    this.getGroupsList();
  }

  initForm() {
    this.student = this.data.data;

    const momentFucker = moment(this.student.dob);
    this.studentForm = this.fb.group({
      nameControl: [this.student.firstname, Validators.required],
      lastNameControl: [this.student.lastname, Validators.required],
      dobControl: [momentFucker, Validators.required],
      schoolControl: [null, Validators.required],
      groupControl: [this.student.group.id, Validators.required],
      passwordControl: [null, Validators.required],
      tokenControl: [this.student.coupon[0]?.value, Validators.required]
    });

    if (this.viewNotEditMode === true) {
      this.studentForm.disable();
    }
  }

  getSchoolsList() {
    this.userService.getSchoolsList().subscribe({
      next: (list) => {
        this.schoolsList = list;
      }
    });
  }
  getGroupsList() {
    this.userService.getGroups().subscribe({
      next: (list) => {
        this.groupsList = list;
      }
    });
  }

  updateStudentData() {
    if (this.viewNotEditMode === true) {
      this.studentForm.enable();
      this.viewNotEditMode = false;
      return;
    }
    const group = this.groupsList.find((grp) => grp.id === this.studentForm.get('groupControl').value);
    const newData = {
      firstname: this.studentForm.get('nameControl').value,
      lastname: this.studentForm.get('lastNameControl').value,
      dob: this.studentForm.get('dobControl').value,
      school: this.studentForm.get('schoolControl').value,
      group: group,
      password: this.studentForm.get('passwordControl').value,
      token: this.studentForm.get('tokenControl').value,
      username: `${this.studentForm.get('nameControl').value.firstname}.${this.studentForm.get('nameControl').value.lastname}`
    };
    this.studentService.updateStudent(newData, this.student.user_id).subscribe({
      next: (value) => {
        this.close();
        this.sharedService.reloadStudentsList.next(true);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
