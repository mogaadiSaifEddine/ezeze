import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { FillLettersSection } from 'src/app/types/exercise';
import * as _ from 'lodash';
import { indexOf } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageComponent } from 'src/app/shared/select-image/select-image.component';
@Component({
  selector: 'ines-drag-img-word',
  templateUrl: './drag-img-word.component.html',
  styleUrls: ['./drag-img-word.component.scss']
})
export class DragImgWordComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() isCheckMode: boolean;
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  valuesList = [];
  correctValuesList = [];

  openedField;
  inputLists = {};
  exerciceType: string;
  sections: any[] = [];
  sectionsCopy: any[] = [];
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  ObjectTo;
  @HostListener('click', ['$event.target']) onClick(e) {
    if (!e.classList.contains('fillable-input') && !e.classList.contains('example-box')) {
      this.sections.map((el) => {
        if (el.hasOwnProperty('opened')) el.opened = false;
      });
    } else {
      //
    }
  }
  constructor(private matDialog: MatDialog) {}
  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    this.exerciceType = <string>(<any>this.exercice.blocks[0].placeholder);

    const brackets = this.exercice.rtl ? ['>', '<'] : ['<', '>'];

    const block = this.exercice.blocks[0];
    const value = <string>block.value;
    this.valuesList = value.split(',');
    let val = <string>block.correctValue;
    //  this.sections: FillLettersSection[] = [];
    let i = 0;
    let j = [...val].findIndex((c) => c === brackets[0]);
    while (j != -1) {
      const c = [...val].findIndex((c) => c === brackets[1]);
      this.sections.push({ value: val.slice(i, j), type: 'text' });
      // actual Input
      this.sections.push({
        value: val.slice(j + 1, c),
        maxLength: val.slice(j + 1, c).length,
        type: this.exerciceType != 'img-to-text' ? 'input' : 'img',
        opened: this.exerciceType != 'img-to-text'
      });
      val = [...val].slice(c + 1, val.length).join('');
      i = 0;
      j = [...val].findIndex((c) => c === '<');
    }
    this.correctValuesList = this.sections.filter((el) => ['input', 'img'].includes(el.type));

    this.sectionsCopy = _.cloneDeep(this.sections);
    this.sectionsCopy.map((el) => {
      //  to verif again while exercice tyepe === img to text
      if (['img'].includes(el.type)) el.value = '';

      return el;
    });
  }
  openInputField(i) {
    this.openedField = this.sections[i];
    this.sections.map((el) => {
      if (el.hasOwnProperty('opened')) el.opened = false;
    });
    this.sections[i].opened = !this.sections[i].opened;
  }
  checkAllFieldsFilled() {
    return Object.keys(this.inputLists).find((key) => this.inputLists[key].length === 0);
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
  checkCorrectValues() {
    let correct = true;
    this.sections.forEach((block, index) => {
      const indexInCorrectList = this.correctValuesList.findIndex((el) => el.value == block.value);
      if (indexInCorrectList !== -1)
        if (this.sectionsCopy?.[index]?.value !== this.valuesList?.[indexInCorrectList]) {
          correct = false;
        }
    });
    this.answerChange.emit(correct);
    this.canGoNext.emit(true);
  }

  openSelectImage(value?) {
    this.matDialog
      .open(
        SelectImageComponent,

        {
          data: {
            imgs: this.valuesList
          },
          width: '80%',
          height: '80%'
        }
      )
      .afterClosed()
      .subscribe((resValue) => {
        value.value = resValue;
        value.changed = true;
      });
  }
}
