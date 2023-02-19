import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-word-builder',
  templateUrl: './word-builder.component.html',
  styleUrls: ['./word-builder.component.scss']
})
export class WordBuilderComponent implements OnInit {

  @ViewChild('wordsCount') wordsCount;
  minimumWordCount = 2;
  sentenceWithWordsBlock: ExerciceBlock;
  BIG_GROUP_FORM !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WordBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.createBigGroupForm();
  }

  createBigGroupForm() {
    this.BIG_GROUP_FORM = this.fb.group({
      GROUP: this.fb.array([])
    })
  }

  /**
   * GROUP CAN BE EITHER A SENTENCE OR A WORD
   * The formControl will allow teachers to specify which one is it
   */

  get GET_GROUP_FROM_ARRAY(): FormArray {
    return this.BIG_GROUP_FORM.get('GROUP') as FormArray;
  }

  addNewSentenceGroupToArray() {
    const NEW_FORM_GROUP = this.fb.group({
      GROUP_CONTROL: [null, Validators.required],
      TYPE_CONTROL: ['sentence', Validators.required],
      STATUS_CONTROL: [true]
    });
    this.GET_GROUP_FROM_ARRAY.push(NEW_FORM_GROUP);
  }

  deleteCurrentSentenceFromGroup(index: number) {
    this.GET_GROUP_FROM_ARRAY.removeAt(index);
  }

  saveSentences() {
    console.log(this.BIG_GROUP_FORM.valid, 'FINAL FORM TO SEND IS ::: ', this.BIG_GROUP_FORM.value);
    if (this.BIG_GROUP_FORM.valid) {

      const PARAMS = {
        sentencesWithWords: this.BIG_GROUP_FORM.value
      }

      this.sentenceWithWordsBlock = {
        exerciceBlockId: null,
        exerciceId: null,
        label: null,
        correctValue: null,
        isAdmissable: null,
        placeholder: null,
        value: null,
        blockOrder: null,
        files: null,
        exerciceBlockType: ExerciceBlockTypes.ANSWER_TO_STROKE,
        blockParams: JSON.stringify(PARAMS)
      }

      this.dialogRef.close(this.sentenceWithWordsBlock);
    }
  }

}
