import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'app-color-the-text',
  templateUrl: './color-the-text.component.html',
  styleUrls: ['./color-the-text.component.scss']
})
export class ColorTheTextComponent implements OnInit, OnChanges {
  @ViewChild('color') colorElement: ElementRef; //outline color;
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();

  textToHighlight: string[] = [];
  correctValue = [];
  colors: ExerciceBlock[] = [];
  ChosenColor: string;
  constructor() {}

  chooseColor(color: string) {
    this.ChosenColor = color;
    this.colorElement.nativeElement.style.background = '2px solid ';
  }
  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.answerChange.emit(false);
    this.textToHighlight = [];
    this.colors = [];
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.HIGHLIGHT_TEXT || block.exerciceBlockType === ExerciceBlockTypes.BREAK) {
        if (block.exerciceBlockType === ExerciceBlockTypes.BREAK) this.textToHighlight.push('br');
        else
          block.label.split(' ').forEach((word: string) => {
            this.textToHighlight.push(word);
          });
      } else if (block.exerciceBlockType === ExerciceBlockTypes.COLOR) {
        this.colors.push(block);
      } else {
        console.log(JSON.parse(block.correctValue));

        this.correctValue.push(JSON.parse(block.correctValue));
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }

  valueChanged(coloredValue) {
    console.log(coloredValue);

    this.canGoNext.emit(true);

    this.checkCorrectValues(coloredValue);
  }

  checkCorrectValues(coloredValue?) {
    let allCorrect = true;
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.HIGHLIGHT_TEXT && !this.correctValue.some((res) => _.isEqual(res, coloredValue))) {
        allCorrect = false;
      }
    });

    this.answerChange.emit(allCorrect);
  }
}
