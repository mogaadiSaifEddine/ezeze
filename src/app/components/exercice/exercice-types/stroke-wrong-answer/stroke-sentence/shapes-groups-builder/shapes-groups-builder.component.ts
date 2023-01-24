import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-shapes-groups-builder',
  templateUrl: './shapes-groups-builder.component.html',
  styleUrls: ['./shapes-groups-builder.component.scss']
})
export class ShapesGroupsBuilderComponent implements OnInit {

  sentencesFormGroup: FormGroup;
  sentenceBlock: ExerciceBlock;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShapesGroupsBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.sentencesFormGroup = this.fb.group({
      sentencesArray: this.fb.array([])
    })
  }

  public get getSentencesFormArray(): FormArray {
    return this.sentencesFormGroup.get('sentencesArray') as FormArray;
  }

  addNewGroupToSentencesArray(event: any) {
    event.preventDefault();
    const newSentenceFormGroup = this.fb.group({
      sentenceBody: [null, Validators.required],
      isWrong: [false]
    })
    this.getSentencesFormArray.push(newSentenceFormGroup);
  }

  removeGroupToSentencesArray(index: number) {
    this.getSentencesFormArray.removeAt(index);
  }

  saveSentences() {
    if (this.sentencesFormGroup.valid) {
      const PARAMS = {
        shapesAndImages: this.sentencesFormGroup.value
      }

      this.sentenceBlock = {
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

      this.dialogRef.close(this.sentenceBlock);
    }
  }

}
