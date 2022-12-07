import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-change',
  templateUrl: './delete-change.component.html',
  styleUrls: ['./delete-change.component.scss'],
})
export class DeleteChangeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteChangeComponent>
  ) {} // Closing dialog window

  public cancel(): void {
    // To cancel the dialog window
    this.dialogRef.close();
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {}
}
