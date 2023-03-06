import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

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

  constructor(private dialogRef: MatDialogRef<MathStringBuilderComponent>) { }

  ngOnInit(): void {
  }


  save() {
    this.ParagraphBlock = {
      exerciceBlockId: null,
      exerciceId: null,
      label: null,
      correctValue: null,
      isAdmissable: null,
      placeholder: null,
      value: null,
      blockOrder: null,
      files: null,
      exerciceBlockType: ExerciceBlockTypes.MATH_STRING,
      blockParams: null
    }

    this.dialogRef.close(this.ParagraphBlock);
  }

}
