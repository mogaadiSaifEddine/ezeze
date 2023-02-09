import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

@Component({
  selector: 'ines-composition-table-teacher-view',
  templateUrl: './composition-table-teacher-view.component.html',
  styleUrls: ['./composition-table-teacher-view.component.scss']
})
export class CompositionTableTeacherViewComponent implements OnInit {
  tableBlock: ExerciceBlock;
  numRow: number;
  complexity: number;
  MATRIX: any[][];
  type: string;
  MATRIX_CORRECTED: any[][];
  constructor(private dialogRef: MatDialogRef<CompositionTableTeacherViewComponent>, private exerciseService: ExcerciceserviceService) {}

  ngOnInit(): void {
    this.drawTableMatrix();
    console.log(this.MATRIX);
    console.log(this.numRow);
    console.log(this.complexity);
  }

  drawTableMatrix() {
    this.exerciseService.tableInfo.subscribe({
      next: (val: any) => {
        this.numRow = val.numRows;
        this.complexity = val.complexity;
        this.type = val.type;

        this.MATRIX = Array.from(Array(val?.numRows), () => new Array(this.complexity));
        this.MATRIX_CORRECTED = Array.from(Array(val?.numRows), () => new Array(this.complexity));

        // console.log(this.MATRIX);
        // console.log(this.numRow);
        // console.log(this.complexity);
        console.log(this.type);
      }
    });
  }

  keepData(event: any, row: any, column: any) {
    console.log(this.MATRIX);
    console.log(column);
    console.log(row);
    this.MATRIX_CORRECTED[row][column] = event.target.value;
    console.log(this.MATRIX_CORRECTED);

    console.log(event.target.value);
  }

  save() {
    const PARAMS = {
      matrixLayout: this.exerciseService.tableInfo.getValue(),
      MATRIX_CORRECTED: this.MATRIX_CORRECTED,
      STUDENT_MATRIX: this.MATRIX
    };
    console.log(PARAMS);

    this.tableBlock = {
      exerciceBlockId: null,
      exerciceId: null,
      label: null,
      correctValue: null,
      isAdmissable: null,
      placeholder: null,
      value: null,
      blockOrder: null,
      files: null,
      exerciceBlockType: ExerciceBlockTypes.TABLE,
      blockParams: JSON.stringify(PARAMS)
    };

    this.dialogRef.close(this.tableBlock);
  }
}
