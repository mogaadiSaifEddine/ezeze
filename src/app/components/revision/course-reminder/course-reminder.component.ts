import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseSeries } from 'src/app/model/CourseSeries';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Types } from 'src/app/model/Exercice_type';
import { SeriesType } from 'src/app/model/SeriesTypes';
import { RevisionService } from 'src/app/services/revision.service';
import { ShowCourseComponent } from './show-course/show-course.component';

@Component({
  selector: 'app-course-reminder',
  templateUrl: './course-reminder.component.html',
  styleUrls: ['./course-reminder.component.scss']
})
export class CourseReminderComponent implements OnInit {
  show_serie_level_1: boolean;
  show_serie_level_2: boolean;
  show_serie_level_3: boolean;

  score: number = 85;
  courses = ['Chapitre A', 'Chapitre B', 'Chapitre C', 'Chapitre D'];
  showCoursesList = true;
  showFinalScoreLevel1 = false;
  showFinalScoreLevel2 = false;
  showFinalScoreLevel3 = false;

  exercices_level_1: CourseSeries;
  exercices_level_2: CourseSeries;
  exercices_level_3: CourseSeries;

  constructor(private dialog: MatDialog, private router: Router, private revisionService: RevisionService) {}

  ngOnInit(): void {
    this.revisionService.exerciceSerie.subscribe((serie: any[]) => {
      this.exercices_level_1 = serie.find((el) => el.seriesType === 'EXERCICE_1');
      this.exercices_level_2 = serie.find((el) => el.seriesType === 'EXERCICE_2');
      this.exercices_level_3 = serie.find((el) => el.seriesType === 'EXERCICE_3');

      console.log(this.exercices_level_1)
      console.log(this.exercices_level_2)
      console.log(this.exercices_level_3)
      
    });
  }

  openCourse(course) {
    this.dialog
      .open(ShowCourseComponent, {
        width: '70%',
        maxHeight: '90vh',
        position: {
          top: '5%',
          left: '20%'
        },
        data: {},
        disableClose: true
      })
      .afterClosed()
      .subscribe((res) => {});
  }

  goToExercicesLevel1() {
    if(this.exercices_level_1.exercices.length>0){
      this.show_serie_level_1 = true;
    }else if(this.exercices_level_2.exercices.length>0){
      this.show_serie_level_2 = true;
    }else if(this.exercices_level_3.exercices.length>0){
      this.show_serie_level_3 = true;
    }else{
      this.showFinalScoreLevel3 = true;

    }
    this.showCoursesList = false;
  }

  testFinishedLevel1(score) {
    this.score = score;
    this.showFinalScoreLevel1 = true;
    this.show_serie_level_1 = false;
  }

  testFinishedLevel2(score) {
    this.score = score;
    this.show_serie_level_2 = false;
    this.showFinalScoreLevel2 = true;
  }

  testFinishedLevel3(score) {
    this.score = score;
    this.show_serie_level_3 = false;
    this.showFinalScoreLevel3 = true;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToNextLevel(event) {
    if (this.showFinalScoreLevel1) {
      
      this.showFinalScoreLevel1 = false;

      this.show_serie_level_2 = true;
    } else {


      this.showFinalScoreLevel2 = false;
      this.show_serie_level_3 = true;
    }
  }
}
