import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// SERVICES
import { SharedService } from 'src/app/services/shared.service';
import { StudentService } from 'src/app/services/espace-parent/student.service';
// COMPONNETS
import { VouchercheckComponent } from '../dialogs/vouchercheck/vouchercheck.component';
import { ViewEditComponent } from 'src/app/components/espace-parent/dialogs/student-forms/view-edit/view-edit.component';
import { DeleteConfirmationComponent } from 'src/app/components/espace-parent/dialogs/delete-confirmation/delete-confirmation.component';
import { TokenDetailsComponent } from 'src/app/components/espace-parent/dialogs/token-details/token-details.component';

// TMP INTERFACE TO BE MOVED
export interface StudentData {
  id: number;
  name: string;
  lastname: string;
  dob: Date;
  school: number;
  group: number;
  token: string;
}

@Component({
  selector: 'app-espace-parent-view',
  templateUrl: './espace-parent-view.component.html',
  styleUrls: ['./espace-parent-view.component.scss']
})
export class EspaceParentViewComponent implements OnInit {
  displayedColumns: string[] = ['student', 'school', 'token', 'actions'];
  dataSource!: MatTableDataSource<any>;
  showGuide = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private sharedService: SharedService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.sharedService.showManageStudentAccountGuide.subscribe({
      next: (value) => {
        this.showGuide = value;
      }
    });
    this.fetchStudentsData();
    this.sharedService.reloadStudentsList.subscribe({
      next: (value) => {
        if (value === true) this.fetchStudentsData();
      }
    });
  }

  openDialog() {
    // const dialogRef = this.dialog.open(AddVoucherComponent);
    const dialogRef = this.dialog.open(VouchercheckComponent);
    dialogRef.afterClosed().subscribe();
  }

  // DATA TABLE HANDLERS
  fetchStudentsData() {
    this.studentService.getAllStudents().subscribe({
      next: (value: any | undefined) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showStudentInfoInSharedDialog(actionType, data) {
    // actionType [update, view]
    const at = actionType;
    this.dialog.open(ViewEditComponent, {
      data: { at, data }
    });
  }

  deleteStudentconfirmation(row) {
    this.dialog.open(DeleteConfirmationComponent, {
      data: row
    });
  }

  displayTokenDetails(row) {
    this.dialog.open(TokenDetailsComponent, {
      data: row.coupon[0]
    });
  }
}
