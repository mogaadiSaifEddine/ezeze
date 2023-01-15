import { Component, Inject, OnInit } from '@angular/core';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ines-equation-layout-builder',
  templateUrl: './equation-layout-builder.component.html',
  styleUrls: ['./equation-layout-builder.component.scss']
})
export class EquationLayoutBuilderComponent implements OnInit {

  /*
    contruct teacher's matrix
    on change, update the teacher's matrix
    use teacher's matrix to draw second one
    on change, save to student's matrix
  */

  MATRIX: any[][];
  MATRIX_TEACHER: any[][];
  MATRIX_STUDENT: any[][];
  equationBlock: ExerciceBlock;

  constructor(
    private exerciseService: ExcerciceserviceService,
    private dialogRef: MatDialogRef<EquationLayoutBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.drawEquationMatrix();
  }

  drawEquationMatrix() {
    this.exerciseService.equationInfo.subscribe({
      next: (val: any) => {
        this.MATRIX = Array.from(Array(val?.numRows), () => new Array(val?.numColumns));
        this.MATRIX_TEACHER = Array.from(Array(val?.numRows), () => new Array(val?.numColumns));
        this.MATRIX_STUDENT = Array.from(Array(val?.numRows), () => new Array(val?.numColumns));
      }
    });
  }

  // Constructing the Initial matrix to show (teacher's view)
  keepData(event: any, row: any, column: any, USER: string) {
    if (USER === 'TEACHER')
      this.MATRIX_TEACHER[row][column] = event.target.value;
    else
      this.MATRIX_STUDENT[row][column] = event.target.value;
  }

  save() {
    const PARAMS = {
      matrixLayout: this.exerciseService.equationInfo.getValue(),
      teacher_matrix: this.MATRIX_TEACHER,
      student_matrix: this.MATRIX_STUDENT
    }

    this.equationBlock = {
      exerciceBlockId: null,
      exerciceId: null,
      label: null,
      correctValue: null,
      isAdmissable: null,
      placeholder: null,
      value: null,
      blockOrder: null,
      files: null,
      exerciceBlockType: ExerciceBlockTypes.EQUATION,
      blockParams: JSON.stringify(PARAMS)
    }

    this.dialogRef.close(this.equationBlock);
  }
}
