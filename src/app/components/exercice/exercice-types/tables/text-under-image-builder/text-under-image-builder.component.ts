import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-text-under-image-builder',
  templateUrl: './text-under-image-builder.component.html',
  styleUrls: ['./text-under-image-builder.component.scss']
})
export class TextUnderImageBuilderComponent implements OnInit {

  imagesFormGroup: FormGroup;
  imageBlock: ExerciceBlock;
  imageURL: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TextUnderImageBuilderComponent>,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.imagesFormGroup = this.fb.group({
      imageURL: [null, Validators.required],
      correctValue: [null, Validators.required]
    })
  }

  assignBackgroundImage() {
    this.imageURL = this.imagesFormGroup.get('imageURL').value;
  }

  saveSentences() {
    if (this.imagesFormGroup.valid) {
      this.imageBlock = {
        exerciceBlockId: null,
        exerciceId: null,
        label: null,
        correctValue: this.imagesFormGroup.get('correctValue').value,
        isAdmissable: null,
        placeholder: null,
        value: this.imagesFormGroup.get('imageURL').value,
        blockOrder: null,
        files: null,
        exerciceBlockType: ExerciceBlockTypes.IMAGE_WITH_TEXT,
        blockParams: null
      }

      this.dialogRef.close(this.imageBlock);
    }
  }

}
