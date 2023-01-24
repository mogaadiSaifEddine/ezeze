import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss']
})
export class ListeningComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  selectedBlock = null;
  constructor() {}

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');
    console.log(this.exercice);
    this.answerChange.emit(false);
  }
  selectBlock(blockToSelect) {
    this.exercice.blocks.forEach((block) => {
      if (block.exercice_Block_Id === blockToSelect.exercice_Block_Id) block.label = 'true';
      else block.label = 'false';
    });
    this.selectedBlock = blockToSelect;
    console.log(this.selectedBlock);

    console.log(this.selectedBlock.value == this.selectedBlock.label);

    this.answerChange.emit(this.selectedBlock.value == this.selectedBlock.label);
    this.canGoNext.emit(true);
  }

  checkCorrectValues() {
    // let allCorrect = true;
    // // this.exercice.blocks.forEach((block) => {
    // //   if (block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT && block.value !== block.correctValue) {
    // //     allCorrect = false;
    // //   }
    // // });
    // if ( )
    console.log(this.selectedBlock.value == this.selectedBlock.correctValue);
  }
}
