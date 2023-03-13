import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExcerciceserviceService } from 'src/app/service/excerciceservice.service';

@Component({
  selector: 'ines-word-coloration-builder',
  templateUrl: './word-coloration-builder.component.html',
  styleUrls: ['./word-coloration-builder.component.scss']
})
export class WordColorationBuilderComponent implements OnInit {

  finalBlock: ExerciceBlock;
  setupForm: FormGroup;
  colorWheelIsVisible = false;


  constructor(
    private dialogRef: MatDialogRef<WordColorationBuilderComponent>,
    private fb: FormBuilder,
    private es: ExcerciceserviceService
  ) { }

  ngOnInit(): void {
    this.initSetupForm();
  }

  // PALETTE LOGIC
  initSetupForm() {
    this.setupForm = this.fb.group({
      numbersOfColumns: [2, Validators.required]
    })
  }
  buildTable() {
    this.es.wordColorationArraySier.next(this.setupForm.value.numbersOfColumns);
  }
}


