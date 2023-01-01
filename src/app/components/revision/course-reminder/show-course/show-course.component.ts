import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseSeries } from 'src/app/model/CourseSeries';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { SeriesType } from 'src/app/model/SeriesTypes';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss']
})
export class ShowCourseComponent implements OnInit {
  showExercices = false;
  evaluationContent: CourseSeries;
  audioSources = [
    {
      src: 'assets/sample_videos/addition.mp4',
      type: 'video/mp4'
    }
  ];
  exerciceIndex = 0;
  score = 0;
  readonly TYPES = Exercise_Types;

  constructor(public dialogRef: MatDialogRef<ShowCourseComponent>, @Inject(MAT_DIALOG_DATA) public data: { imgSrc; imageType: string }) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
