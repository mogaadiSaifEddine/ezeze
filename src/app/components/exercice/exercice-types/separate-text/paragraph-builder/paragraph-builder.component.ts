import { Component, OnInit } from '@angular/core';
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

  virtualKeyboardEntries = ['/', '\'', '*', '.', '-', '_'];
  teachersParagraph: any;
  correctParagraph: any;
  chosenSeparators = [];
  ParagraphBlock: ExerciceBlock;


  constructor(
    private es: ExcerciceserviceService,
    private dialogRef: MatDialogRef<ParagraphBuilderComponent>
  ) { }

  ngOnInit(): void {
  }

  updateSeparatorsArray(event: any){
    const CURRENT_ENTRY = {
      symbol: event.target.value,
      checked: event.target.checked,
    }
    if (CURRENT_ENTRY.checked === true)
    this.chosenSeparators.push(CURRENT_ENTRY.symbol)
    else 
    this.chosenSeparators = this.chosenSeparators.filter(entry=>entry!==CURRENT_ENTRY.symbol)
  }

  save(){
    const FINALCOMBINATION = {
      paragToShow: this.teachersParagraph,
      paragToValidateAgainst: this.correctParagraph,
      virtualKeyboard: this.chosenSeparators
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
      exerciceBlockType: ExerciceBlockTypes.EQUATION,
      blockParams: JSON.stringify(FINALCOMBINATION)
    }

    this.dialogRef.close(this.ParagraphBlock);
  }

}
