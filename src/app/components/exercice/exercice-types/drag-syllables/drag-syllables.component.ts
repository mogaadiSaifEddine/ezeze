import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { RevisionService } from 'src/app/services/revision.service';

@Component({
  selector: 'app-drag-syllables',
  templateUrl: './drag-syllables.component.html',
  styleUrls: ['./drag-syllables.component.scss']
})
export class DragSyllablesComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Input() isCheckMode: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  correspandance_left: ExerciceBlock[] = [];
  correspandance_right: ExerciceBlock[] = [];

  constructor(private revisionService: RevisionService) {}

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.revisionService.resetFormSub.subscribe((res) => {
      this.exercice.blocks.forEach((block) => {
        block.value ? (block.value = '') : '';
      });
    });
    this.initExercice();
  }
  private initExercice() {
    this.canGoNext.emit(true);
    this.correspandance_left = [];
    this.correspandance_right = [];
    this.correspandance_left = [...this.exercice.blocks.filter((b) => b.exerciceBlockType === ExerciceBlockTypes.CORRESPONDANCE_LEFT)];

    this.exercice.blocks
      .filter((b) => b.exerciceBlockType === ExerciceBlockTypes.CORRESPONDANCE_RIGHT)
      .forEach((block) => {
        if (this.isCheckMode) {
          this.correspandance_right[this.correspandance_left.findIndex((b) => b.exerciceBlockType === ExerciceBlockTypes.CORRESPONDANCE_LEFT && b.correctValue === block.value)] =
            block;
        } else {
          this.correspandance_right.push(block);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }
  drop(event: CdkDragDrop<ExerciceBlock[]>) {
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

    for (let index = 0; index < event.container.data.length; index++) {
      const block = event.container.data[index];
      this.correspandance_left[index].value = block.value;
    }
    this.exercice.blocks = this.correspandance_left.concat(this.correspandance_right);

    this.checkCorrectValues();
    this.canGoNext.emit(true);
  }
  checkCorrectValues() {
    let allCorrect = true;
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.CORRESPONDANCE_LEFT && block.value !== block.correctValue) {
        allCorrect = false;
      }
    });

    this.answerChange.emit(allCorrect);
  }
}
