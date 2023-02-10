import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

@Component({
  selector: 'ines-composition-table-builder',
  templateUrl: './composition-table-builder.component.html',
  styleUrls: ['./composition-table-builder.component.scss']
})
export class CompositionTableBuilderComponent implements OnInit {
  tableForm: FormGroup;
  tableInfo: any;
  firstStepDone = false;

  constructor(private fb: FormBuilder, private exerciseService: ExcerciceserviceService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.tableForm = this.fb.group({
      numRows: [null, Validators.required],
      complexity: [null, Validators.required]
      // type: [null, Validators.required]
    });
  }

  buildTable() {
    this.tableInfo = this.tableForm.value;
    if (this.tableForm.valid) {
      this.exerciseService.tableInfo.next(this.tableInfo);
      this.firstStepDone = true;
    }
  }
}
