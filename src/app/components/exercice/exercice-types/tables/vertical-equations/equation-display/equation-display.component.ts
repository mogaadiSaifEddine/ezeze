import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';
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

  constructor() { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.EQUATION) {
        block.blockParams = JSON.parse(block.blockParams);
      }
    });
  }

  valueChanged(e: any, index: any) {
    const USER_ANSWER = e.target;
    const ANSWER_INDEX = index.blockOrder;

    console.log('VALUE HAS BEEN CHANGED ::: ', USER_ANSWER, ANSWER_INDEX);


    // if (this.CORRECT_NAMES_ARRAY[ANSWER_INDEX] === USER_ANSWER)
    //   this.correct = true
    // else
    //   this.correct = false;

    // this.answerChange.emit(this.correct);
    // this.canGoNext.emit(true);
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.EQUATION) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }

}
