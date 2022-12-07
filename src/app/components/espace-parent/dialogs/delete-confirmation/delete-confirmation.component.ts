import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { StudentService } from 'src/app/services/espace-parent/student.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  StudentDetails = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private studentSerive: StudentService,
    private ss: SharedService,
    private userService: UserService
  ) {}

  ngOnInit(): void {


    this.StudentDetails = this.data;
  }

  deleteStudent() {
    this.userService.deleteUser(this.data.username).subscribe({
      next: (value) => {
        this.close();
        this.ss.reloadStudentsList.next(true);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
