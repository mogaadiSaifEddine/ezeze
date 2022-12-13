import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-fill-empty-fields',
  templateUrl: './fill-empty-fields.component.html',
  styleUrls: ['./fill-empty-fields.component.scss']
})
export class FillEmptyFieldsComponent implements OnInit, OnChanges {
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
    this.answerChange.emit(false);
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
    this.canGoNext.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }
  valueChanged() {
    this.checkCorrectValues();
  }

  checkCorrectValues() {
    let allCorrect = true;
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT && block.value !== block.correctValue) {
        allCorrect = false;
      }
    });

    this.answerChange.emit(allCorrect);
  }
}
