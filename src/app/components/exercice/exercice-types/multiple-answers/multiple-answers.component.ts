import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-multiple-answers',
  templateUrl: './multiple-answers.component.html',
  styleUrls: ['./multiple-answers.component.scss']
})
export class MultipleAnswersComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;

  constructor() {}

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');
    this.initExercice();
  }
  private initExercice() {
    this.exercice.blocks.forEach((block: ExerciceBlock) => {
      block.value === 'true' ? (block.value = true) : (block.value = false);
      block.correctValue === null ? (block.correctValue = 'false') : '';
    });
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }
  valueChanged(event) {
    this.checkCanGoNext();
    this.checkAllCorrectFieldsChecked();
  }

  checkCanGoNext() {
    const trueBlock = this.exercice.blocks.find((block) => block.value === true);

    trueBlock ? this.canGoNext.emit(true) : this.canGoNext.emit(false);
  }

  checkAllCorrectFieldsChecked() {
    let correct = true;

    this.exercice.blocks.forEach((block) => {
      if (JSON.stringify(block.value) !== block.correctValue) {
        correct = false;
        return;
      }
    });

    this.answerChange.emit(correct);
  }
}
