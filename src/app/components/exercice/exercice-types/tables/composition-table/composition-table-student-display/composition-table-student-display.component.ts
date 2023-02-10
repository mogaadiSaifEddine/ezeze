import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-composition-table-student-display',
  templateUrl: './composition-table-student-display.component.html',
  styleUrls: ['./composition-table-student-display.component.scss']
})
export class CompositionTableStudentDisplayComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  IS_CORRECT_COMBINATION = false;
  MATRIX: any[][];

  constructor() {}

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TABLE) {
        block.blockParams = JSON.parse(block.blockParams);
        this.MATRIX = Array.from(Array(block.blockParams.numRows), () => new Array(block.blockParams.complexity));
      }
    });
  }

  valueChanged(e: any, index: any, correctValue: any) {
    const USER_ANSWER = e.target.value;
    this.IS_CORRECT_COMBINATION = USER_ANSWER === correctValue;
    this.answerChange.emit(this.IS_CORRECT_COMBINATION);
    this.canGoNext.emit(true);
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TABLE) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }
}
