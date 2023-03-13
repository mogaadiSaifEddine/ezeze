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
        this.ARRAY = Array.from(Array(1), () => new Array(value));
        this.ARRAY_TEACHER = Array.from(Array(1), () => new Array(value));
        this.ARRAY_STUDENT = Array.from(Array(1), () => new Array(value));
      }
    })
  }

  // Constructing the Initial matrix to show (teacher's view)
  keepData(event: any, row: any, column: any, USER: string) {
    if (USER === 'TEACHER')
      this.ARRAY_TEACHER[row][column] = event.target.value;
    else
      this.ARRAY_STUDENT[row][column] = event.target.value;
  }






  saveBlock() {
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
      blockParams: null
    }

    this.dialogRef.close(this.finalBlock);
  }

}
