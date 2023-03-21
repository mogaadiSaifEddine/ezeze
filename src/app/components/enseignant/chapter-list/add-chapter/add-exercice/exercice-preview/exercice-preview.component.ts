import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercice } from 'src/app/model/Exercice';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-exercice-preview',
  templateUrl: './exercice-preview.component.html',
  styleUrls: ['./exercice-preview.component.scss']
})
export class ExercicePreviewComponent implements OnInit {
  readonly TYPES = Exercise_Types;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentExercise: Exercice }, private sharedService: SharedService) {}
  ngOnInit() {
    this.data.currentExercise.name = this.sharedService.replaceBreaksInQuestion(this.data.currentExercise.name);
  }
}
