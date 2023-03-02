import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercice } from 'src/app/model/Exercice';
import { Exercise_Types } from 'src/app/model/Exercice_type';

@Component({
  selector: 'app-exercice-preview',
  templateUrl: './exercice-preview.component.html',
  styleUrls: ['./exercice-preview.component.scss']
})
export class ExercicePreviewComponent implements OnInit {

  readonly TYPES = Exercise_Types;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentExercise: Exercice }) { }
  ngOnInit() {
  }
}
