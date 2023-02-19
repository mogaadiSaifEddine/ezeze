import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { RevisionService } from 'src/app/services/revision.service';
import { SerieService } from 'src/app/services/serie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.scss']
})
export class NumericComponent implements OnInit, OnChanges {
  imgUrl: any;
  questions;
  api = environment.serverApi;
  loading = true;

  questionCopy;
  exerciceCopy;

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;

  constructor(private revisionService: RevisionService, private serieService: SerieService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.exerciceCopy = _.cloneDeep(this.exercice);
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');
    // this.getImageFile();

    this.revisionService.resetFormSub.subscribe((res) => {
      this.questions ? (this.questions.value = '') : '';
    });
    this.questionCopy = this.questions;
    if (this.exercice['rtl']) {
      this.questions.map((oneQuestionToBeReversed) => {
        const currentLabel = oneQuestionToBeReversed['label'];
        oneQuestionToBeReversed['label'] = this.reverseEquationToArabic(currentLabel);
      });
    }
    this.initExercice();
  }
  private initExercice() {
    this.answerChange.emit(false);
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
    this.questions = this.exercice.blocks.filter((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.INPUT_NUMBER);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }

  getImageFile() {
    if (this.exercice?.exerciceFile) {
      this.serieService.getFile(this.exercice?.exerciceFile?.carte_id).subscribe((res) => {
        const objectURL = URL.createObjectURL(res);
        this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  valueChanged() {
    let correct = true;
    this.questions.forEach((element) => {
      if (element.value != element.correctValue) {
        correct = false;
      }
    });
    this.answerChange.emit(correct);
    this.canGoNext.emit(true);
  }

  private reverseEquationToArabic(questionLabel: any) {
    const ARABIC_NUMBERS = questionLabel.split(/[-+*/=]+/).reverse();

    const ARABIC_OPERATION = questionLabel
      .split(/[0-9]/)
      .reverse()
      .filter((el) => el !== '');
    let FINAL_ARABIC = '';
    let counter = 0;
    let counter2 = 0;
    console.log(ARABIC_OPERATION);
    console.log(ARABIC_NUMBERS);

    // MAP AND CONCATENATE
    ARABIC_NUMBERS.map((field: any, index: number) => {
      FINAL_ARABIC += field;

      if (ARABIC_OPERATION.length) FINAL_ARABIC += ARABIC_OPERATION[0];
      ARABIC_OPERATION.shift();
    });
    console.log(FINAL_ARABIC);

    return FINAL_ARABIC;
  }

  ngOnDestroy() {
    console.log(this.exerciceCopy);
    this.exercice = this.exerciceCopy;
    this.questions = this.questionCopy;
  }
}
