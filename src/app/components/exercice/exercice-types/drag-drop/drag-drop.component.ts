import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { DragDropItem } from 'src/app/model/Drag_Drop_Item';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit, OnChanges {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  listBlocks: ExerciceBlock[] = [];
  imageList: DragDropItem[][] = [];
  dragDropItem: DragDropItem[] = [];

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.initExercice();
  }
  private initExercice() {
    this.exercice.blocks.forEach((block) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.DRAG_DROP_IMAGE_LIST) {
        this.imageList = [
          ...this.imageList,
          block.label.split(',').map((item) => {
            return { label: item, value: '', disabled: true, blockId: block.exerciceBlockId };
          })
        ];

        this.listBlocks.push(block);
      } else if (block.exerciceBlockType === ExerciceBlockTypes.IMAGE) {
        this.dragDropItem = [...this.dragDropItem, { label: block.label, value: block.value, disabled: false, blockId: '' }];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }

  drop(event: CdkDragDrop<DragDropItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    // this.listBlock.value = this.listBlock.value + event.container.data[event.currentIndex].value + ',';

    let exId = event.container.id.replace(/[^0-9]/g, '');

    let currentExerciceblock = this.imageList[parseInt(exId) - 1]?.find((item) => item.disabled === true);

    event.container.data.forEach((item) => {
      //   if (item.value !== '') {
      //     this.exercice.blocks.find((block) => block.exerciceBlockId === currentExerciceblock.blockId).value = item.value + ',';
      //
      //   }
      //
      // });

      this.exercice.blocks.forEach((block, index) => {
        if (block.exerciceBlockId === currentExerciceblock?.blockId && item.disabled === false && block.value.toString().indexOf(item.value.toString()) === -1) {
          block.value += item.value.toString() + ',';
          block.exerciceBlockId = currentExerciceblock.blockId;
        }
      });
    });

    this.canGoNext.emit(true);
    this.answerChange.emit(this.isCorrect());
  }
  isCorrect() {
    let correct = true;
    this.exercice.blocks
      .filter((block) => block.exerciceBlockType === ExerciceBlockTypes.DRAG_DROP_IMAGE_LIST)
      .forEach((block) => {
        const valuesArray = block.value.toString().split(',').sort();
        const correctAnswerArray = block.correctValue.toString().split(',').sort();
        correctAnswerArray.unshift('');

        if (JSON.stringify(valuesArray) !== JSON.stringify(correctAnswerArray)) {
          correct = false;
        }
      });
    return correct;
  }
}
