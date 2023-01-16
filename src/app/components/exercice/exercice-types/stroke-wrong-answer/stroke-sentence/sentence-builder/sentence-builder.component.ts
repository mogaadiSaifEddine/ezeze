import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ines-sentence-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.scss']
})
export class SentenceBuilderComponent implements OnInit {

  sentencesFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder
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
      sentenceBody: [null],
      isWrong: [false]
    })
    this.getSentencesFormArray.push(newSentenceFormGroup);
  }

  removeGroupToSentencesArray(index: number) {
    this.getSentencesFormArray.removeAt(index);
  }

}
