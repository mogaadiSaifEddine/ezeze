import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { RevisionService } from 'src/app/services/revision.service';

@Component({
  selector: 'app-sequencing',
  templateUrl: './sequencing.component.html',
  styleUrls: ['./sequencing.component.scss']
})
export class SequencingComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;

  constructor(private revisionService: RevisionService) {}

  ngOnInit(): void {
    this.revisionService.resetFormSub.subscribe((res) => {
      this.exercice.blocks.forEach((block) => {
        block.value ? (block.value = '') : '';
      });
    });

    this.initExercice();
  }
  private initExercice() {
    this.refreshAnswerValue();
    this.canGoNext.emit(true);
    let index = this.exercice.blocks.findIndex((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
    this.imageBlock = this.exercice.blocks[index];

    this.exercice.blocks.splice(index, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
      this.exercice.blocks.sort((a, b) => +a.value - +b.value);
    }
  }

  valueChanged(event) {
    this.answerChange.emit(event.value.value === event.value.correctValue);
  }

  drop(event) {
    this.move(event.previousIndex, event.currentIndex);
    this.resetBlocksValues();
    this.refreshAnswerValue();
  }
  move(pos1: number, pos2: number): void {
    let element = this.exercice.blocks[pos1];

    this.exercice.blocks.splice(pos1, 1);
    this.exercice.blocks.splice(pos2, 0, element);
  }
  resetBlocksValues() {
    this.exercice.blocks.forEach((element, index) => {
      element.value = index + 1 + '';
    });
  }
  refreshAnswerValue() {
    let correct = true;
    this.exercice.blocks.forEach((block) => {
      if (block.value !== block.correctValue) {
        correct = false;
      }
    });

    this.answerChange.emit(correct);
  }
}
