import { Component, OnInit } from '@angular/core';
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

  paragraphsFormGroup: FormGroup;
  sentenceWithWordsBlock: ExerciceBlock;
  BIG_GROUP_FORM !: FormGroup;




  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WordBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.paragraphsFormGroup = this.fb.group({ sentencesArray: this.fb.array([]) });
    this.createBigGroupForm();
  }

  // ************ GROUP LOGIC
  createBigGroupForm() {
    this.BIG_GROUP_FORM = this.fb.group({
      GROUP_ARRAY: this.fb.array([])
    })
  }

  get GET_FORM_ARRAY(): FormArray {
    return this.BIG_GROUP_FORM.get('GROUP_ARRAY') as FormArray;
  }

  addNewGroupToArray() {
    const NEW_FORM_GROUP = this.fb.group({
      SUB_CONTROL_1: [],
      SUB_CONTROL_2: [],
    });

    this.GET_FORM_ARRAY.push(NEW_FORM_GROUP);
  }

  deleteCurrentGroup(index: number) {
    this.GET_FORM_ARRAY.removeAt(index);
  }












  // ******************** SENTENCES *******
  // **************************************
  // public get getSentencesFormArray(): FormArray {
  //   return this.paragraphsFormGroup.get('sentencesArray') as FormArray;
  // }

  // AddNewSentenceGroupWithWordsArray(event: any) {
  //   event.preventDefault();
  //   const newSentenceFormGroup = this.fb.group({
  //     sentenceBody: [null, Validators.required],
  //     wordsArray: this.fb.array([])
  //   })
  //   this.getSentencesFormArray.push(newSentenceFormGroup);
  // }

  // removeSentenceGroupWithWordsArray(index: number) {
  //   this.getSentencesFormArray.removeAt(index);
  // }

  // ******************** WORDS *******
  // **********************************

  // addNewWordsFormGroupToSentenceArray(sentencesArray: any, count: any) {
  //   const newWordFormGroup = this.fb.group({
  //     wordBody: [null, Validators.required],
  //     isWrong: [false]
  //   })
  //   const res = [...Array(parseInt(count.value))].map((_: any, index: number) => {
  //     sentencesArray.push(newWordFormGroup);
  //   });
  // }

  // removeWordsFormGroupToSentenceArray(sentencesArray: any, index: number) {
  //   sentencesArray.removeAt(index);
  // }

  // assignWordsToSentence(wordsArray: any) {
  //   // console.log('MUST ASSIGN THEESE :: ', wordsArray);
  // }


  saveSentences() {
    if (this.paragraphsFormGroup.valid) {
      const PARAMS = {
        sentencesWithWords: this.paragraphsFormGroup.value
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
