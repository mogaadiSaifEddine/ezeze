import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  CURRENT_CARET_POSITION: any;
  CORRECT_TXT = '';
  CURRENT_TXT = '';

  constructor() { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TEXT_TO_SEPARATE) {
        block.blockParams = JSON.parse(block.blockParams);
        this.CORRECT_TXT = block.blockParams['paragToValidateAgainst'];
        this.CURRENT_TXT = block.blockParams['paragToShow'];
        this.CURRENT_CARET_POSITION = this.CURRENT_TXT.length;
      }
    });
  }

  // HEPER METHODS
  logCaretPosition(event: any) {
    this.CURRENT_CARET_POSITION = event.target.selectionStart;
  }

  inertSymbol(symbol: string) {
    const LEGACY_STRING = this.CURRENT_TXT;
    this.CURRENT_TXT = LEGACY_STRING.substring(0, this.CURRENT_CARET_POSITION) + symbol + LEGACY_STRING.substring(this.CURRENT_CARET_POSITION);

    const ANSWER_IS_CORRECT = this.CORRECT_TXT === this.CURRENT_TXT;
    this.answerChange.emit(ANSWER_IS_CORRECT);
    this.canGoNext.emit(true);
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.TEXT_TO_SEPARATE) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }
}
