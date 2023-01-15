import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { FillLettersSection } from 'src/app/types/exercise';
@Component({
  selector: 'ines-fill-letters',
  templateUrl: './fill-letters.component.html',
  styleUrls: ['./fill-letters.component.scss']
})
export class FillLettersComponent implements OnInit {
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;
  sectionsMatrix: FillLettersSection[][] = [];

  constructor() {}

  ngOnInit(): void {
    console.debug(this.exercice)
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');
    const brackets = this.exercice.rtl ? ['>', '<'] : ['<', '>']
    this.exercice.blocks.forEach((b) => {
      let val = <string>b.value;
      const sections: FillLettersSection[] = [];
      let i = 0;
      let j = [...val].findIndex((c) => c === brackets[0]);
      while (j != -1) {
        const c = [...val].findIndex((c) => c === brackets[1]);
        sections.push({ value: val.slice(i, j), type: 'text' });
        // actual Input
        sections.push({ value: '', maxLength: val.slice(j + 1, c).length,  type: 'input' });
        val = [...val].slice(c + 1, val.length).join('');
        i = 0;
        j = [...val].findIndex((c) => c === '<');
      }
      if (val) sections.push({type: 'text', value: val})
      this.sectionsMatrix.push(sections);
    });

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
    this.exercice.blocks.forEach((block,i ) => {
      if (this.sectionsMatrix[i].reduce((a,c) => a+ c.value, '') !== block.correctValue)
      allCorrect = false;
    });

    this.answerChange.emit(allCorrect);
  }
}
