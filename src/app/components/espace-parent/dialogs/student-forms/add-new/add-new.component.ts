import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import { UserService } from 'src/app/services/userservice.service';
import { StudentService } from 'src/app/services/espace-parent/student.service';
import { SharedService } from 'src/app/services/shared.service';
import { readonly } from 'utils-decorators';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  dobValue: any;
  studentForm: FormGroup;
  setudentFormArray: FormArray;
  groupsListDoneFetching = false;
  groupsList = null;
  schoolsListDoneFetching = false;
  schoolsList = null;
  countTracker = this.sharedService.currentCount;
  disableAddButton = false;
  tokenCapacity = this.sharedService.currentTokenData.numberUsers;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<AddNewComponent>,
    private userService: UserService,
    private studentService: StudentService,
    private sharedService: SharedService,
    private dp: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchDataFromDB();
    this.initForm();
  }

  fetchDataFromDB() {
    this.fetchGroups();
    this.fetchSchools();
  }

  fetchGroups() {
    this.userService.getGroups().subscribe({
      next: groupsList => {
        this.groupsList = groupsList;
        this.groupsListDoneFetching = true;
      }
    });
  }
  fetchSchools() {
    this.userService.getSchoolsList().subscribe({
      next: schoolList => {
        this.schoolsList = schoolList;
        this.schoolsListDoneFetching = true;
      }
    });
  }

  handleDateChange(event) {
    this.dobValue = this.dp.transform(new Date(event), 'yyyy-MM-dd');
  }

  // FORM HANDLERS
  // === PARENT ===
  initForm() {
    this.studentForm = this.fb.group({
      studentsArray: this.fb.array([])
    });
  }
  public get getStudentsFormArray(): FormArray {
    return this.studentForm.get('studentsArray') as FormArray;
  }

  // === FUCKING CHILDREN ===
  addNewFormGroup(event) {
    event.preventDefault();
    const tmpStudentFormGroup = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      datenaissance: [null, Validators.required],
      school: [null, Validators.required],
      group: [null, Validators.required],
      token: [this.sharedService.currentToken],
      password: [Date.now().toString(), readonly]
    });
    // updating the internal count
    this.countTracker += 1;
    this.tokenCapacity -= 1;
    this.getStudentsFormArray.push(tmpStudentFormGroup);
    this.trackCount(this.countTracker);
  }
  trackCount(currentCount) {
    if (currentCount >= this.sharedService.currentTokenData.numberUsers) {
      this.disableAddButton = true;
    } else {
      this.disableAddButton = false;
    }
  }

  deleteFormGroup(i) {
    this.getStudentsFormArray.removeAt(i);
    // updating the internal count
    this.countTracker -= 1;
    this.tokenCapacity += 1;
    this.trackCount(this.countTracker);
  }

  submitHandler() {
    const studentData = this.studentForm.value;
    studentData.studentsArray.map(sd => {
      sd = {
        ...sd,
        datenaissance: moment().format(this.dobValue),
        username: `${sd.firstname}.${sd.lastname}`,
        confirmepassword: sd.password,
        email: `${sd.firstname}.${sd.lastname}.${Date.now()}@ines.com`,
        isblocked: null,
        enabled: false,
        profession: 'student',
        phone: null
      };

      const tokenID = this.sharedService.currentTokenData.id;
      this.studentService.addStudent(sd, tokenID).subscribe({
        next: value => {
          this.close();
          this.sharedService.reloadStudentsList.next(true);
        }
      });
    });
  }

  // DIALOG ACTIONS
  close() {
    this.dialogRef.close();
  }

}
