import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'ines-csi-builder',
  templateUrl: './csi-builder.component.html',
  styleUrls: ['./csi-builder.component.scss']
})
export class CsiBuilderComponent implements OnInit {

  finalBlock: ExerciceBlock;


  constructor(
    private dialogRef: MatDialogRef<CsiBuilderComponent>
  ) { }

  ngOnInit(): void {
    // init form if there is any
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
      exerciceBlockType: ExerciceBlockTypes.SHAPES_IMAGES_TO_COLOR,
      blockParams: JSON.stringify({ params: 'insert oibject or set to null' })
    }

    this.dialogRef.close(this.finalBlock);
  }
}
