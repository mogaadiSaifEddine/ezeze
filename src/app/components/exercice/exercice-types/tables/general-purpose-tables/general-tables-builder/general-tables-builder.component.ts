import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';
@Component({
  selector: 'ines-general-tables-builder',
  templateUrl: './general-tables-builder.component.html',
  styleUrls: ['./general-tables-builder.component.scss']
})
export class GeneralTablesBuilderComponent implements OnInit {

  tableForm: FormGroup;
  tableInfo: any;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExcerciceserviceService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.tableForm = this.fb.group({
      numRows: [null, Validators.required],
      numColumns: [null, Validators.required]
    });
  }

  buildTable() {
    this.tableInfo = this.tableForm.value;
    if (this.tableForm.valid) {
      this.exerciseService.tableInfo.next(this.tableInfo);
    }
  }

}
