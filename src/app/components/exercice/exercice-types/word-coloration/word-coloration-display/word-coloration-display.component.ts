import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AnswerFeedback, Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'ines-word-coloration-display',
  templateUrl: './word-coloration-display.component.html',
  styleUrls: ['./word-coloration-display.component.scss']
})
export class WordColorationDisplayComponent implements OnInit, OnDestroy {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();
  cursorColor = '';
  width = 10;
  color: string;
  alpha = 1;

  get cursor(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.makeCursor());
  }
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.COLOR_PARAMS) {
        block.blockParams = <Array<any>>JSON.parse(block.blockParams);
        block.blockFinal = <Array<any>>block.blockParams;

        block.blockFinal.forEach((element) => {
          element.crrentColor = '#000000';
        });
      }
    });
  }
  selectColor(color: string) {
    this.cursorColor = color;
  }
  colorText(i: number, j: number) {
    this.exercice.blocks[i].blockFinal[j].crrentColor = this.cursorColor;
    this.canGoNext.emit(true);
    this.verfiAnswer();
  }
  verfiAnswer() {
    let answer = true;

    for (let block of this.exercice.blocks) {
      if (block.blockFinal.some((el) => el.color !== el.crrentColor)) {
        answer = false;
        break;
      }
    }

    this.answerChange.emit(answer);
  }
  makeCursor() {
    const cursor = document.createElement('canvas'),
      ctx = cursor.getContext('2d');

    cursor.width = this.width;
    cursor.height = this.width;
    ctx.strokeStyle = this.cursorColor ?? 'black';
    ctx.fillStyle = this.cursorColor ?? 'black';
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.width / 2, this.width / 2, this.width / 2, 0, 2 * Math.PI);
    ctx.fill();

    return `url(${cursor.toDataURL()}) ${this.width / 2} ${this.width / 2}, auto`;
  }

  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.COLOR_PARAMS) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }
}
