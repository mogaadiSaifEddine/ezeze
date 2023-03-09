import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  blockForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CsiBuilderComponent>
  ) { }

  ngOnInit(): void {
    this.blockForm = this.formBuilder.group({
      image_url: [null, Validators.required],
      image_is_colored: [false, Validators.required],
      image_color: ['#dd6565'],
    })
  }

  changeComplete($event: any) {
    console.log($event.color);

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
