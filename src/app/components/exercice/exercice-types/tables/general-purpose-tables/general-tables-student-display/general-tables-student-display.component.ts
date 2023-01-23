import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'ines-general-tables-student-display',
  templateUrl: './general-tables-student-display.component.html',
  styleUrls: ['./general-tables-student-display.component.scss']
})
export class GeneralTablesStudentDisplayComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  IS_CORRECT_COMBINATION = false;

  constructor() { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TABLE) {
        block.blockParams = JSON.parse(block.blockParams);
      }
    });
  }

  valueChanged(e: any, index: any, correctValue: any) {
    const USER_ANSWER = e.target.value;
    this.IS_CORRECT_COMBINATION = (USER_ANSWER === correctValue);

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
