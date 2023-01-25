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
export class DragSyllablesComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Input() isCheckMode: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  correspandance_left: ExerciceBlock[] = [];
  correspandance_right: ExerciceBlock[] = [];
  wordsList=[]

  constructor(private revisionService: RevisionService) {}

  ngOnInit(): void {
    this.exercice.blocks.map(block=>{
      block.blockFileList = block.correctValue.split('/')
      block.blockFileList=block.blockFileList.splice(0,block.blockFileList.length-1)
      this.shuffle(block.blockFileList)
    })
    
    this.wordsList =this.exercice.blocks
    console.log("EXERCICE",this.exercice)
    
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.revisionService.resetFormSub.subscribe((res) => {
      this.exercice.blocks.forEach((block) => {
        block.value ? (block.value = '') : '';
      });
    });
    this.canGoNext.emit(true);
  }

  // drop(event: CdkDragDrop<ExerciceBlock[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     if (event.container.data.length === 0) {
  //       transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  //     } else {
  //       transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, 1);
  //       transferArrayItem(event.container.data, event.previousContainer.data, 0, event.previousIndex);
  //     }
  //   }

  //   for (let index = 0; index < event.container.data.length; index++) {
  //     const block = event.container.data[index];
  //     this.correspandance_left[index].value = block.value;
  //   }
  //   this.exercice.blocks = this.correspandance_left.concat(this.correspandance_right);

  //   this.checkCorrectValues();
  //   this.canGoNext.emit(true);
  // }

  drop(event: CdkDragDrop<string[]>,word) {
    console.log(event)
    moveItemInArray(word, event.previousIndex, event.currentIndex);
    this.checkCorrectValues();

    console.log(word)
    console.log(this.wordsList)
  }
  checkCorrectValues() {
    let allCorrect = true;
    this.exercice.blocks.forEach((block) => {
      if (block.blockFileList.join('/')+'/' != block.correctValue) {
        allCorrect = false;
      }
    });

    this.answerChange.emit(allCorrect);
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
}
