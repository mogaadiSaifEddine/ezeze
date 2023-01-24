import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

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
    private exerciseService: ExcerciceserviceService
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
      this.exerciseService.equationInfo.next(this.equationInformation);
    }
  }

}
