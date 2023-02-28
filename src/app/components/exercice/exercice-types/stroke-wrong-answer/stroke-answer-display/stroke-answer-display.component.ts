import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'ines-stroke-answer-display',
  templateUrl: './stroke-answer-display.component.html',
  styleUrls: ['./stroke-answer-display.component.scss']
})
export class StrokeAnswerDisplayComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();

  strokeSentence = false;
  MIRROR_SENTENCES_ARRAY: any[];
  finalBoolean = true;
  value: any;

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      // SENTENCE BLOCKS
      if (block.exerciceBlockType === ExerciceBlockTypes.ANSWER_TO_STROKE) {
        this.MIRROR_SENTENCES_ARRAY = Array(0);
        block.blockParams = JSON.parse(block.blockParams);
      }
    });
  }

  // SENTENCES LOGIC
  keepTrackOfFinalResultForSentences(action: string, index: number) {
    this.exercice.blocks.map(block => {
      const SENTENCE_ARRAY = block.blockParams['sentences'].sentencesArray;

      if ((action === 'stroked'))
        this.MIRROR_SENTENCES_ARRAY.push(SENTENCE_ARRAY[index]);
      else
        this.MIRROR_SENTENCES_ARRAY = this.MIRROR_SENTENCES_ARRAY.filter(e => e !== SENTENCE_ARRAY[index]);

      // The following conditions relies on at least one element being marked as 'wrong' by the teacher
      // otherwise this will always output useless data
      this.finalBoolean = (this.MIRROR_SENTENCES_ARRAY.filter(e => e.isWrong === false).length === 0) && (this.MIRROR_SENTENCES_ARRAY.filter(e => e.isWrong === true).length >= 1);
    })
  }

  toggleStroke(event: any, index: number) {
    if (event.target.className.includes('strokedSentence')) {
      this.render.removeClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForSentences('', index);
    } else {
      this.render.addClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForSentences('stroked', index);
    }

    this.answerChange.emit(this.finalBoolean);
    this.canGoNext.emit(true);
  }

  // WORDS LOGIC
  keepTrackOfFinalResultForWords(action: string, sentenceIndex: number) {
    this.exercice.blocks.map(block => {
      const WORDS_ARRAY = block.blockParams['sentencesWithWords'].GROUP;
      if ((action === 'stroked'))
        this.MIRROR_SENTENCES_ARRAY.push(WORDS_ARRAY[sentenceIndex]);
      else
        this.MIRROR_SENTENCES_ARRAY = this.MIRROR_SENTENCES_ARRAY.filter(e => e !== WORDS_ARRAY[sentenceIndex]);

      // The following conditions relies on at least one element being marked as 'wrong' by the teacher
      // otherwise this will always output useless data
      this.finalBoolean = (this.MIRROR_SENTENCES_ARRAY.filter(e => e.STATUS_CONTROL === true).length >= 1) && (this.MIRROR_SENTENCES_ARRAY.filter(e => e.STATUS_CONTROL !== true).length === 0);
    })
  }

  toggleStrokeForWords(event: any, index: number) {
    if (event.target.className.includes('strokedSentence')) {
      this.render.removeClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForWords('', index);
    } else {
      this.render.addClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForWords('stroked', index);
    }

    this.answerChange.emit(this.finalBoolean);
    this.canGoNext.emit(true);
  }

  // SHAPES AND IMAGES
  keepTrackOfFinalResultForShapesAndImages(action: string, index: number) {
    this.exercice.blocks.map(block => {
      const SENTENCE_ARRAY = block.blockParams['shapesAndImages'].sentencesArray;

      if ((action === 'stroked'))
        this.MIRROR_SENTENCES_ARRAY.push(SENTENCE_ARRAY[index]);
      else
        this.MIRROR_SENTENCES_ARRAY = this.MIRROR_SENTENCES_ARRAY.filter(e => e !== SENTENCE_ARRAY[index]);

      // The following conditions relies on at least one element being marked as 'wrong' by the teacher
      // otherwise this will always output useless data
      this.finalBoolean = (this.MIRROR_SENTENCES_ARRAY.filter(e => e.isWrong === false).length === 0) && (this.MIRROR_SENTENCES_ARRAY.filter(e => e.isWrong === true).length >= 1);
    })
  }

  toggleStrokeForShapesAndImages(event: any, index: number) {
    if (event.target.className.includes('strokedSentence')) {
      this.render.removeClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForShapesAndImages('', index);
    } else {
      this.render.addClass(event.target, "strokedSentence");
      this.keepTrackOfFinalResultForShapesAndImages('stroked', index);
    }

    this.answerChange.emit(this.finalBoolean);
    this.canGoNext.emit(true);
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.ANSWER_TO_STROKE) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }

}
