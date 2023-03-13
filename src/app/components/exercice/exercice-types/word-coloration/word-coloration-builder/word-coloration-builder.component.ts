import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-word-coloration-builder',
  templateUrl: './word-coloration-builder.component.html',
  styleUrls: ['./word-coloration-builder.component.scss']
})
export class WordColorationBuilderComponent implements OnInit {

  finalBlock: ExerciceBlock;


  constructor(
    private dialogRef: MatDialogRef<WordColorationBuilderComponent>
  ) { }

  ngOnInit(): void {
    
  }


  saveBlock() {
    this.finalBlock = {
      exerciceBlockId: null,
      exerciceId: null,
      label: null,
      correctValue: null,
      isAdmissable: null,
      placeholder: null,
      value: null,
      blockOrder: null,
      files: null,
      exerciceBlockType: ExerciceBlockTypes.COLOR_PARAMS,
      blockParams: null
    }

    this.dialogRef.close(this.finalBlock);
  }
}


