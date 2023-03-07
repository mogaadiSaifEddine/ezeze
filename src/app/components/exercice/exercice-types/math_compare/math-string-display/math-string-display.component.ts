import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'ines-math-string-display',
  templateUrl: './math-string-display.component.html',
  styleUrls: ['./math-string-display.component.scss']
})
export class MathStringDisplayComponent implements OnInit {

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  ARRAY_OF_VALUES = [];
  ANSWERS_ARE_CORRECT = false;

  constructor() { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.MATH_STRING) {
        const MATH_OBJECT = {
          numbersArray: block.value.split(','),
          correctString: block.correctValue.split(','),
          user_input: block.correctValue.split(',').fill('*')
        }
        this.ARRAY_OF_VALUES.push(MATH_OBJECT);
      }
    });
  }

  verifyOnChange(lineNumber: number, groupIndex: number, event: any) {
    console.log('verifying ....');

    this.updateUserInputArray(lineNumber, groupIndex, event);
    this.answerChange.emit(this.ANSWERS_ARE_CORRECT);
    this.canGoNext.emit(true);
  }


  updateUserInputArray(lineNumber: number, groupIndex: number, event: any) {
    console.log('updating...');

    let signToPush = '';
    switch (event.target.value) {
      case 'lessThan':
        signToPush = '<';
        break;
      case 'greaterThan':
        signToPush = '>';
        break;
      default:
        signToPush = '=';
        break;
    }
    this.ARRAY_OF_VALUES[lineNumber].user_input[groupIndex] = signToPush;
    this.updateBoolean();
  }

  updateBoolean() {
    this.ARRAY_OF_VALUES.map((line: any, index: number) => {
      this.ANSWERS_ARE_CORRECT = (line.user_input.toString() === line.correctString.toString());

    })
  }


}
