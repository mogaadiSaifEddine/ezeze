import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

@Component({
  selector: 'ines-paragraph-builder',
  templateUrl: './paragraph-builder.component.html',
  styleUrls: ['./paragraph-builder.component.scss']
})
export class ParagraphBuilderComponent implements OnInit {
  @ViewChild('separatorsInput') separatorsInput!: ElementRef;

  virtualKeyboardEntries = [];
  teachersParagraph: any;
  correctParagraph: any;
  ParagraphBlock: ExerciceBlock;


  constructor(
    private es: ExcerciceserviceService,
    private dialogRef: MatDialogRef<ParagraphBuilderComponent>
  ) { }

  ngOnInit(): void { }

  updateSeparatorsArray() {
    this.virtualKeyboardEntries = [...this.separatorsInput.nativeElement.value];
  }

  save() {
    const FINALCOMBINATION = {
      paragToShow: this.teachersParagraph,
      paragToValidateAgainst: this.correctParagraph,
      virtualKeyboard: this.virtualKeyboardEntries
    }

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
      exerciceBlockType: ExerciceBlockTypes.TEXT_TO_SEPARATE,
      blockParams: JSON.stringify(FINALCOMBINATION)
    }

    this.dialogRef.close(this.ParagraphBlock);
  }

}
