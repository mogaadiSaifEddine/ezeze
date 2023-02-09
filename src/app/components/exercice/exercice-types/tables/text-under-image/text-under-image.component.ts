import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'ines-text-under-image',
  templateUrl: './text-under-image.component.html',
  styleUrls: ['./text-under-image.component.scss']
})
export class TextUnderImageComponent implements OnInit {

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  images: ExerciceBlock[] = [];
  imageToDisplay: any;
  CORRECT_NAMES_ARRAY = [];
  correct = false;

  constructor() { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.IMAGE_WITH_TEXT) {
        this.CORRECT_NAMES_ARRAY.push(block.correctValue);
      }
    });
  }

  valueChanged(e: any, index: any) {
    const USER_ANSWER = e.target.value;
    const ANSWER_INDEX = index.blockOrder;

    if (this.CORRECT_NAMES_ARRAY[ANSWER_INDEX] === USER_ANSWER)
      this.correct = true
    else
      this.correct = false;

    this.answerChange.emit(this.correct);
    this.canGoNext.emit(true);
  }
}
