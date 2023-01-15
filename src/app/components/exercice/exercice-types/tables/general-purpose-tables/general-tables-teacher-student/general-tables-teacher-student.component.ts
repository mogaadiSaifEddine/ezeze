import { Component, Inject, OnInit } from '@angular/core';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

@Component({
  selector: 'ines-general-tables-teacher-student',
  templateUrl: './general-tables-teacher-student.component.html',
  styleUrls: ['./general-tables-teacher-student.component.scss']
})
export class GeneralTablesTeacherStudentComponent implements OnInit {

  /*
    contruct teacher's matrix
    on change, update the teacher's matrix
    use teacher's matrix to draw second one
    on change, save to student's matrix
  */

  MATRIX: any[][];
  MATRIX_TEACHER: any[][];
  MATRIX_STUDENT: any[][];
  tableBlock: ExerciceBlock;

  constructor(
    private exerciseService: ExcerciceserviceService,
    private dialogRef: MatDialogRef<GeneralTablesTeacherStudentComponent>
  ) { }

  ngOnInit(): void {
    this.drawTableMatrix();
  }

  drawTableMatrix() {
    this.exerciseService.tableInfo.subscribe({
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
      matrixLayout: this.exerciseService.tableInfo.getValue(),
      teacher_matrix: this.MATRIX_TEACHER,
      student_matrix: this.MATRIX_STUDENT
    }

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
    }

    this.dialogRef.close(this.tableBlock);
  }

}
