import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ines-math-string-builder',
  templateUrl: './math-string-builder.component.html',
  styleUrls: ['./math-string-builder.component.scss']
})
export class MathStringBuilderComponent implements OnInit {

  virtualKeyboardEntries = [];
  teachersParagraph: any;
  correctParagraph: any;
  ParagraphBlock: ExerciceBlock;
  mathForm !: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MathStringBuilderComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.mathForm = this.fb.group({
      numbers: [null, Validators.required],
      correctString: [null, Validators.required]
    })
  }


  save() {
    if (this.mathForm.valid) {
      console.log();
      this.ParagraphBlock = {
        exerciceBlockId: null,
        exerciceId: null,
        label: null,
        correctValue: this.mathForm.value.correctString,
        isAdmissable: null,
        placeholder: null,
        value: this.mathForm.value.numbers,
        blockOrder: null,
        files: null,
        exerciceBlockType: ExerciceBlockTypes.MATH_STRING,
        blockParams: null
      }

      this.dialogRef.close(this.ParagraphBlock);
    }
  }
}
