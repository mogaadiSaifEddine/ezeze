import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ines-init-equation-form',
  templateUrl: './init-equation-form.component.html',
  styleUrls: ['./init-equation-form.component.scss']
})
export class InitEquationFormComponent implements OnInit {

  equationForm: FormGroup;

  constructor(
    private fb: FormBuilder
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
    console.log(this.equationForm.value);
  }

}
