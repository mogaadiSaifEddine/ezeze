import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-drag-words',
  templateUrl: './drag-words.component.html',
  styleUrls: ['./drag-words.component.scss']
})
export class DragWordsComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() isCheckMode: boolean;
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  valuesList = [];
  inputLists = {};

  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  ObjectTo;

  constructor() {}

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    const block = this.exercice.blocks.find((block) => {
      return block.exerciceBlockType === ExerciceBlockTypes.HIGHLIGHT_TEXT;
    });
    if (this.isCheckMode) {
      this.valuesList = block.value ? (<string>block.value).split('/') : [];
      this.exercice.blocks.forEach((block, index) => {
        if (block.exerciceBlockType === this.ExerciceBlockTypes.INPUT_TEXT) {
          this.inputLists[index] = [block.correctValue];
          this.valuesList.splice(this.valuesList.findIndex(v => v === block.correctValue), 1);
        }
      });
    } else {
      this.valuesList = block.value ? (<string>block.value).split('/') : [];
      this.exercice.blocks.forEach((block, index) => {
        if (block.exerciceBlockType === this.ExerciceBlockTypes.INPUT_TEXT) {

          this.inputLists[index] = [];
        }
      });
    }
    console.debug(this.exercice, this.inputLists, this.valuesList);

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length === 0) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, 1);
        transferArrayItem(event.container.data, event.previousContainer.data, 0, event.previousIndex);
      }
    }
    if (!this.checkAllFieldsFilled()) {
      this.checkCorrectValues();
      this.canGoNext.emit(true);
    }
  }

  checkAllFieldsFilled() {
    return Object.keys(this.inputLists).find((key) => this.inputLists[key].length === 0);
  }
  checkCorrectValues() {
    let correct = true;
    this.exercice.blocks.forEach((block, index) => {
      if (block.exerciceBlockType === 'INPUT_TEXT' && block.correctValue !== this.inputLists[index] ? this.inputLists[index][0] : false) {
        correct = false;
      }
    });
    this.answerChange.emit(correct);
  }
}
