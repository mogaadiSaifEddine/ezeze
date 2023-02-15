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
      SENTENCE_GROUP_ARRAY: this.fb.array([]),
      WORDS_GROUP_ARRAY: this.fb.array([])
    })
  }

  // ****SENTENCES

  get GET_SENTENCES_FROM_ARRAY(): FormArray {
    return this.BIG_GROUP_FORM.get('SENTENCE_GROUP_ARRAY') as FormArray;
  }

  addNewSentenceGroupToArray() {
    const NEW_FORM_GROUP = this.fb.group({
      SENTENCE_CONTROL: []
    });
    this.GET_SENTENCES_FROM_ARRAY.push(NEW_FORM_GROUP);
  }

  deleteCurrentSentenceFromGroup(index: number) {
    this.GET_SENTENCES_FROM_ARRAY.removeAt(index);
  }

  // ****WORDS

  get GET_WORDS_FROM_ARRAY(): FormArray {
    return this.BIG_GROUP_FORM.get('WORDS_GROUP_ARRAY') as FormArray;
  }

  addNewWordGroupToArray() {
    const NEW_FORM_GROUP = this.fb.group({
      WORD_CONTROL: []
    });
    const res = [...Array(parseInt(this.wordsCount.nativeElement.value))].map((_: any, index: number) => {
      this.GET_WORDS_FROM_ARRAY.push(NEW_FORM_GROUP);
    });
  }

  deleteCurrentWordFromGroup(index: number) {
    console.log("GIVEN INDEX IS ::: ", index, " ELEMENT THERE IS ::: ", this.GET_WORDS_FROM_ARRAY[index]);

    this.GET_WORDS_FROM_ARRAY.removeAt(index);
  }


  saveSentences() {
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
