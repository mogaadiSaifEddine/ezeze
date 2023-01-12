import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';
// SERVICES
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';
@Component({
  selector: 'ines-equation-display',
  templateUrl: './equation-display.component.html',
  styleUrls: ['./equation-display.component.scss']
})
export class EquationDisplayComponent implements OnInit {

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  MATRIX: any[][]; // the one to display
  MIRROR_MATRIX_STUDENT: any[][]; // the one to allow edits on
  CURRENT_OPERATOR: any;

  constructor(
    private exerciseService: ExcerciceserviceService
  ) { }

  ngOnInit(): void {
    this.initExercice();
  }

  private drawEquationMatrix() {
    this.exerciseService.equationInfo.subscribe({
      next: (val: any) => {
        this.MATRIX = Array.from(Array(val?.numRows), () => new Array(val?.numColumns));
        this.MIRROR_MATRIX_STUDENT = Array.from(Array(val?.numRows), () => new Array(val?.numColumns));
      }
    });
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.EQUATION) {
        const EQUATION_BLOCK = block?.blockParams;
        this.CURRENT_OPERATOR = EQUATION_BLOCK.matrixLayout.operator;
        this.drawEquationMatrix();
        for (let indexRow = 0; indexRow < EQUATION_BLOCK.matrixLayout.numRows; indexRow++) {
          for (let indexColumn = 0; indexColumn < EQUATION_BLOCK.matrixLayout.numColumns; indexColumn++) {
            this.MATRIX[indexRow][indexColumn] = EQUATION_BLOCK.teacher_matrix[indexRow][indexColumn];
            this.MIRROR_MATRIX_STUDENT[indexRow][indexColumn] = EQUATION_BLOCK.student_matrix[indexRow][indexColumn];
          }
        }
      }
    });
  }

  valueChanged(e: any, index: any) {
    const USER_ANSWER = e.target.value;
    const ANSWER_INDEX = index.blockOrder;

    // if (this.CORRECT_NAMES_ARRAY[ANSWER_INDEX] === USER_ANSWER)
    //   this.correct = true
    // else
    //   this.correct = false;

    // this.answerChange.emit(this.correct);
    // this.canGoNext.emit(true);
  }

}
