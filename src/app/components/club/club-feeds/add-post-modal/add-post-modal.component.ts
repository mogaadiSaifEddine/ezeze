import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteChangeComponent } from './delete-change/delete-change.component';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.scss']
})
export class AddPostModalComponent implements OnInit {
  userName: string = 'Jilani Ourari';
  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  wasFormChanged = false;
  selected: string = 'Text';
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addCusForm = this.fb.group({
      postType: ['Text', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 1; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  openDialog(): void {
    if (this.addCusForm.dirty) {
      this.dialog.open(DeleteChangeComponent, {
        width: '340px'
      });
    } else {
      this.dialog.closeAll();
      this.addCusForm.value.postType = '';
    }
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 1;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
