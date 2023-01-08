import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EquationLayoutBuilderComponent } from '../equation-layout-builder/equation-layout-builder.component';

@Component({
  selector: 'ines-init-equation-form',
  templateUrl: './init-equation-form.component.html',
  styleUrls: ['./init-equation-form.component.scss']
})
export class InitEquationFormComponent implements OnInit {

  equationForm: FormGroup;
  equationInformation: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.equationForm = this.fb.group({
      numRows: [null, Validators.required],
      numColumns: [null, Validators.required],
      operator: [null, Validators.required],
      isEmpty: [false, Validators.required]
    });
  }

  buildEquation() {
    this.equationInformation = this.equationForm.value;
    if (this.equationForm.valid) {
      this.dialog
        .open(EquationLayoutBuilderComponent, {
          data: this.equationInformation
        })
    }
  }

}
