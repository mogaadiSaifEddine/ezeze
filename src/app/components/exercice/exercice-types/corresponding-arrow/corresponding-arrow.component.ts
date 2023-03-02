import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Line } from './draw-lines/draw-lines.component';

@Component({
  selector: 'app-corresponding-arrow',
  templateUrl: './corresponding-arrow.component.html',
  styleUrls: ['./corresponding-arrow.component.scss']
})
export class CorrespondingArrowComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;

  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  arrow_left: ExerciceBlock[] = [];
  arrow_right: ExerciceBlock[] = [];
  left = [1, 2, 3];
  right = [10, 5, 9];
  rightArrow: any = 0;
  leftArrow: any = 0;
  lines: Line[] = [];
  selectedBox = 0;

  content = 'short';
  count = 0;
  expanded = false;

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.canGoNext.emit(true);
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType == ExerciceBlockTypes.ARROW_LEFT) {
        this.arrow_left.push(block);
      } else if (block.exerciceBlockType == ExerciceBlockTypes.ARROW_RIGHT) {
        this.arrow_right.push(block);
      }
    });
  }

  listenToClick(x, direction: string): void {
    if (direction === 'left' && this.leftArrow == 0) {
      this.selectedBox = x;
      this.leftArrow = x;
    } else if (this.rightArrow == 0 && direction === 'right' && this.leftArrow != 0) {
      this.selectedBox = 0;

      this.rightArrow = x;

      this.lines = [
        ...this.lines,
        {
          from: this.leftArrow.label.toString(),
          to: this.rightArrow.label.toString(),
          position: {
            from: ['center', 'right'],
            to: ['center', 'left']
          }
        }
      ];
      this.rightArrow = 0;
      this.leftArrow = 0;
    } else {
      this.leftArrow = x;
    }
    this.answerChange.emit(true);
    this.checkCorrectValues();
  }

  checkCorrectValues() {
    let allCorrect = true;
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.ARROW_LEFT && block.value !== block.correctValue) {
        allCorrect = false;
      }
    });

    this.answerChange.emit(allCorrect);
  }

  clearLines(): void {
    this.lines = [];
  }
}
