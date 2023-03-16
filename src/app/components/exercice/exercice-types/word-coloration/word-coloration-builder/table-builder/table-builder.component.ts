import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';
import { WordColorationBuilderComponent } from '../word-coloration-builder.component';

@Component({
  selector: 'ines-table-builder',
  templateUrl: './table-builder.component.html',
  styleUrls: ['./table-builder.component.scss']
})
export class TableBuilderComponent implements OnInit {

  ARRAY: any[][];
  ARRAY_TEACHER: any[];
  ARRAY_STUDENT: any[];
  finalBlock: ExerciceBlock;

  constructor(
    private es: ExcerciceserviceService,
    private dialogRef: MatDialogRef<WordColorationBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.es.wordColorationArraySier.subscribe({
      next: (value: any) => {
        value = parseInt(value);
        this.ARRAY = Array.from(Array(1), () => new Array(value));
        this.ARRAY_TEACHER = Array.from(Array(1), () => new Array(value));
        this.ARRAY_STUDENT = Array.from(Array(1), () => new Array(value));
        this.syncStudentArrayWithDefaultValues();
      }
    });

  }

  // Constructing the Initial matrix to show (teacher's view)
  keepData(event: any, row: any, column: any, USER: string) {
    if (USER === 'TEACHER')
      this.ARRAY_TEACHER[row][column] = event.target.value;
    else
      this.ARRAY_STUDENT[row][column] = event.color.hex;
  }

  syncStudentArrayWithDefaultValues() {
    for (var i = 0; i < this.ARRAY_STUDENT.length; i++) {
      var ROW = this.ARRAY_STUDENT[i];
      for (var j = 0; j < ROW.length; j++) {
        ROW[j] = "#000000";
      }
    }
  }

  saveBlock() {
    const DATA = [];

    for (var i = 0; i < this.ARRAY_STUDENT.length; i++) {
      var ROW = this.ARRAY_STUDENT[i];
      for (var j = 0; j < ROW.length; j++) {
        const data = {
          color: ROW[j],
          body: this.ARRAY_TEACHER[i][j]
        }
        DATA.push(data);
      }
    }

    this.finalBlock = {
      exerciceBlockId: null,
      exerciceId: null,
      label: null,
      correctValue: null,
      isAdmissable: null,
      placeholder: null,
      value: null,
      blockOrder: null,
      files: null,
      exerciceBlockType: ExerciceBlockTypes.COLOR_PARAMS,
      blockParams: JSON.stringify(DATA)
    }

    this.dialogRef.close(this.finalBlock);
  }

}
