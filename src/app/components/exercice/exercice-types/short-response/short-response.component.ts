import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { RevisionService } from 'src/app/services/revision.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-short-response',
  templateUrl: './short-response.component.html',
  styleUrls: ['./short-response.component.scss']
})
export class ShortResponseComponent implements OnInit, OnChanges {
  questions;
  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;
  // EDITOR CONFIGURATION
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '3rem',
    maxHeight: '15rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: 'arial',
    defaultFontSize: 'auto',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
        'fontSize',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  }

  constructor(private revisionService: RevisionService) { }

  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.revisionService.resetFormSub.subscribe((res) => {
      this.questions ? (this.questions.value = '') : '';
    });
    this.initExercice();
    console.log(this.exercice['rtl']);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }
  private initExercice() {
    this.answerChange.emit(false);
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
    this.questions = this.exercice.blocks.filter(
      (block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT || block.exerciceBlockType === ExerciceBlockTypes.BREAK
    );
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
}
