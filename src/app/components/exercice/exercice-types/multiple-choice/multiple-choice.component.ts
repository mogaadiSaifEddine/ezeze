import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { RevisionService } from 'src/app/services/revision.service';
import { Block } from 'typescript/lib/tsserverlibrary';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;

  constructor(private revisionService: RevisionService) { }

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.revisionService.resetFormSub.subscribe((res) => {
      this.exercice.blocks.forEach((block) => {
        block.value ? (block.value = '') : '';
      });
    });
    this.answerChange.emit(false);
    this.initExercice();
  }
  private initExercice() {
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['exercice']) {
    //   this.initExercice();
    // }
  }
  valueChanged(event) {
    this.answerChange.emit(JSON.stringify(event.source._checked) === event.value.correctValue);
    this.canGoNext.emit(true);
  }
}
