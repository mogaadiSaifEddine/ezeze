import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';
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
  cursorColor = '#000';
  width = 10;
  CONTENT_ARRAY = []; // contains a copy of exercise blocks
  finalBoolean: boolean = false;
  palette: string[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  get cursor(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.makeCursor());
  }

  ngOnInit(): void {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.COLOR_PARAMS) {
        // rendering blockParams object usable
        this.CONTENT_ARRAY.push(JSON.parse(block.blockParams));
        // setting default color to display to black
        this.CONTENT_ARRAY.forEach(element => element.crrentColor = '#000000');
      }
      this.initPalette();
    });
  }

  initPalette() {
    this.CONTENT_ARRAY.map(SENTENCE => {
      SENTENCE.map(sentenceBlock => {
        this.palette.push(sentenceBlock.color);
      })
    });
    this.palette = this.palette.filter((item, index) => this.palette.indexOf(item) === index)
  }

  colorCurrentWordWithChosenColorFromPlatte(sentenceIndex: number, wordIndex: number) {
    this.CONTENT_ARRAY[wordIndex].crrentColor = this.cursorColor;
    this.canGoNext.emit(true);
    this.verfyAnswer();
  }

  verfyAnswer() {
    this.finalBoolean = this.CONTENT_ARRAY.every(element => element.color === element.crrentColor);
    this.answerChange.emit(this.finalBoolean);
  }

  makeCursor() {
    const cursor = document.createElement('canvas'), ctx = cursor.getContext('2d');

    cursor.width = cursor.height = this.width;
    ctx.fillStyle = this.cursorColor ?? 'black';
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
