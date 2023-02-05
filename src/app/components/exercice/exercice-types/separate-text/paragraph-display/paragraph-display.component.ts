import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'ines-paragraph-display',
  templateUrl: './paragraph-display.component.html',
  styleUrls: ['./paragraph-display.component.scss']
})
export class ParagraphDisplayComponent implements OnInit {

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
      if (block.exerciceBlockType === ExerciceBlockTypes.TEXT_TO_SEPARATE) {
        block.blockParams = JSON.parse(block.blockParams);
      }
    });
  }

  valueChanged() {

    // this.answerChange.emit(this.IS_CORRECT_COMBINATION);
    // this.canGoNext.emit(true);
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TEXT_TO_SEPARATE) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }

}
