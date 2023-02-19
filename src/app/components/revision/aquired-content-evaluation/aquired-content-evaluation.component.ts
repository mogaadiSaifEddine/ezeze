import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { CourseSeries } from 'src/app/model/CourseSeries';
import { RevisionService } from 'src/app/services/revision.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowConceptMapComponent } from './show-concept-map/show-concept-map.component';
import { ShowCourseComponent } from '../course-reminder/show-course/show-course.component';
import { UserService } from 'src/app/services/userservice.service';
import { ChapitreService } from 'src/app/services/chapitre.service';
import { Chapter } from 'src/app/model/Chapter';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
@Component({
  selector: 'app-aquired-content-evaluation',
  templateUrl: './aquired-content-evaluation.component.html',
  styleUrls: ['./aquired-content-evaluation.component.scss']
})
export class AquiredContentEvaluationComponent implements OnInit {
  evaluationContent: CourseSeries;
  exercice1Content: CourseSeries;
  exercice2Content: CourseSeries;
  exercice3Content: CourseSeries;
  selectedExercice: number;
  prerequisiteContent: CourseSeries;
  readonly TYPES = Exercise_Types;
  score = 0;

  serieExercice: any[];
  evaluationMode = false;
  showExcellentScreen = false;
  showMainScreen = true;
  prerequisiteMode = false;
  showCourseReminderMode = false;
  showExercicesMode = false;
  exerciceIndex = 0;
  showGoNextStepScreen = false;
  UserId: number;
  showFinalScore = false;
  serieType;
  fileCard;
  fileCourse;
  fileTypeCart;
  fileTypeCourse;
  loading = true;
  lastStepTypes = {
    EVALUATION: this.evaluationMode,
    PREREQUISITE: this.prerequisiteMode,
    EXERCICE: this.showExercicesMode
  };
  _ = _
  chapter: Chapter;
  constructor(
    private router: Router,
    private chapterService: ChapitreService,
    private revisionService: RevisionService,
    private dialog: MatDialog,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadSerie();
    this.loadFile();
  }
  loadFile() {
    this.revisionService.chapter.subscribe((chapter: Chapter) => {
      console.log(chapter);

      this.chapter = chapter;
      // if (chapter.catre_conceptuelle)
      //   this.chapterService.getFileCart(chapter.catre_conceptuelle.carte_id).subscribe((res) => {
      //     this.fileTypeCart = chapter.catre_conceptuelle.name.includes('mp4')
      //       ? 'video'
      //       : chapter.catre_conceptuelle.name.includes('pdf')
      //       ? 'pdf'
      //       : 'image';
      //     if (this.fileTypeCart !== 'pdf') {
      //       const objectURL = URL.createObjectURL(res);
      //       this.fileCard = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      //     } else this.fileCard = res;
      //   });
      // if (chapter.course)
      //   this.chapterService.getFileCourse(chapter.course.carte_id).subscribe((res) => {
      //     this.fileTypeCourse = chapter.course.name.includes('mp4') ? 'video' : chapter.course.name.includes('pdf') ? 'pdf' : 'image';
      //     if (this.fileTypeCourse !== 'pdf') {
      //       const objectURL = URL.createObjectURL(res);
      //       this.fileCourse = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      //     } else this.fileCourse = res;
      //     //
      //   });
    });
  }
  loadSerie() {
    this.revisionService.exerciceSerie.subscribe((serie: any[]) => {
      if (!serie) return;
      this.serieExercice = serie;

      this.exercice1Content = serie.find((el) => el.seriesType === 'EXERCICE_1');
      this.exercice2Content = serie.find((el) => el.seriesType === 'EXERCICE_2');
      this.exercice3Content = serie.find((el) => el.seriesType === 'EXERCICE_3');
      this.evaluationContent = serie.find((el) => el.seriesType === 'EVALUATION');
      this.prerequisiteContent = serie.find((el) => el.seriesType === 'PREREQUISITE');

      this.getUserData();
    });
  }
  getUserData() {
    const userconnected = localStorage.getItem('userconnected');
    this.userService.getUser(userconnected).subscribe((res) => {
      this.UserId = res.user_id;

      this.revisionService.getLastExerciceId(this.UserId).subscribe(
        (el) => {
          this.loading = false;
          // this.serieType = el.serie;
          this.serieType = 'EVALUATION';
          if (this.serieType == 'EVALUATION' && this.evaluationContent.exercices.length == 0) {
            this.serieType = 'PREREQUISITE';
          }
          if (this.serieType == 'PREREQUISITE' && this.prerequisiteContent.exercices.length == 0) {
            this.serieType = 'EXERCICE_1';
            this.selectedExercice = 1;
          }
          if (this.serieType == 'EXERCICE_1' && this.exercice1Content.exercices.length == 0) {
            this.serieType = 'EXERCICE_2';
            this.selectedExercice = 2;
          }
          if (this.serieType == 'EXERCICE_2' && this.exercice2Content.exercices.length == 0) {
            this.serieType = 'EXERCICE_3';
            this.selectedExercice = 3;
          }

          if (
            this.exercice1Content.exercices.length == 0 &&
            this.exercice2Content.exercices.length == 0 &&
            this.exercice3Content.exercices.length == 0 &&
            this.prerequisiteContent.exercices.length == 0 &&
            this.evaluationContent.exercices.length == 0
          ) {
            this.router.navigate(['revision/chapitres']);
          }
          console.log(this.serieType);
        },
        (err) => {
          this.loading = false;
          // this.serieType = el.serie;
          this.serieType = 'EVALUATION';
          if (this.serieType == 'EVALUATION' && this.evaluationContent.exercices.length == 0) {
            this.serieType = 'PREREQUISITE';
          }
          if (this.serieType == 'PREREQUISITE' && this.prerequisiteContent.exercices.length == 0) {
            this.serieType = 'EXERCICE_1';
            this.selectedExercice = 1;
          }
          if (this.serieType == 'EXERCICE_1' && this.exercice1Content.exercices.length == 0) {
            this.serieType = 'EXERCICE_2';
            this.selectedExercice = 2;
          }
          if (this.serieType == 'EXERCICE_2' && this.exercice2Content.exercices.length == 0) {
            this.serieType = 'EXERCICE_3';
            this.selectedExercice = 3;
          }

          if (
            this.exercice1Content.exercices.length == 0 &&
            this.exercice2Content.exercices.length == 0 &&
            this.exercice3Content.exercices.length == 0 &&
            this.prerequisiteContent.exercices.length == 0 &&
            this.evaluationContent.exercices.length == 0
          ) {
            this.router.navigate(['revision/chapitres']);
          }
        }
      );
    });
  }
  goNextStep(event) {
    this.showGoNextStepScreen = false;

    console.log(
      this.exercice1Content.exercices.length > 0 || this.exercice2Content.exercices.length > 0 || this.exercice3Content.exercices.length > 0
    );

    if (
      this.exercice1Content.exercices.length > 0 ||
      this.exercice2Content.exercices.length > 0 ||
      this.exercice3Content.exercices.length > 0
    ) {
      if (this.score < 30) {
        this.prerequisiteMode = true;
        // if (this.prerequisiteContent.exercices.length) {
        // return
        // }
        // this.showExercicesMode = true
      } else if (this.score < 50) {
        this.showCourseReminderMode = true;
      } else {
        console.log('  this.showExercicesMode ');

        this.showExercicesMode = true;
      }
    } else {
      if (this.score < 30 && this.prerequisiteContent.exercices.length > 0) {
        this.prerequisiteMode = true;
      } else if ((this.score < 50 && this.prerequisiteContent.exercices.length > 0) || this.prerequisiteContent.exercices.length == 0) {
        this.showCourseReminderMode = true;
      } else if (
        this.exercice1Content.exercices.length > 0 ||
        this.exercice2Content.exercices.length > 0 ||
        this.exercice3Content.exercices.length > 0
      ) {
        this.showExercicesMode = true;
      } else {
        this.showFinalScore = true;
      }
    }
  }

  evaluationTestFinished(score) {
    const userAnswer = {
      id: this.evaluationContent.id,
      score: score,
      user: this.UserId
    };

    console.log(score);

    // this.showExercicesMode = true;
    this.selectedExercice = 1;
    if (score < 50) {
      this.prerequisiteMode = true;
    } else {
      this.prerequisiteMode = false;
      this.showCourseReminderMode = false;
    }
    // this.revisionService.addUserAnswer(userAnswer).subscribe((res) => {});
    this.score = score;
    this.evaluationMode = false;
    this.showGoNextStepScreen = true;
    // score = 10;
  }

  prerequisiteTestFinished(score) {
    const userAnswer = {
      id: this.prerequisiteContent.id,
      score: score,
      user: this.UserId
    };
    this.showExercicesMode = true;
    this.selectedExercice = 1;
    // this.revisionService.addUserAnswer(userAnswer).subscribe((res) => {});

    this.score = score;
    if (score < 50) {
      this.router.navigate(['/revision/course-reminder']);
    } else {
      this.prerequisiteMode = false;
      this.showCourseReminderMode = true;
    }
  }

  goToExercices() {
    this.showCourseReminderMode = false;
    if (this.exercice1Content.exercices.length > 0) {
      this.showExercicesMode = true;
    } else {
      this.showFinalScore = true;
    }
  }

  testFinished(score) {
    let id = '0';
    this.showGoNextStepScreen = true;
    this.showExercicesMode = false;
    switch (this.selectedExercice) {
      case 1:
        id = this.exercice1Content.id;
        this.selectedExercice = 2;
        this.showExercicesMode = true;
        break;
      case 2:
        id = this.exercice2Content.id;
        this.selectedExercice = 3;
        this.showExercicesMode = true;
        break;
      case 3:
        id = this.exercice3Content.id;
        this.showFinalScore = true;
        this.showGoNextStepScreen = false;

        break;
    }
    const userAnswer = {
      id: id,
      score: score,
      user: this.UserId
    };
    console.log('here end of section');

    // this.revisionService.addUserAnswer(userAnswer).subscribe((res) => {});
  }
  goToDashboard() {
    this.router.navigate(['/revision/matieres']);
  }

  startEvaluation(event) {
    this.showMainScreen = event;

    if (this.serieType === 'EVALUATION') this.evaluationMode = true;
    if (this.serieType === 'PREREQUISITE') this.prerequisiteMode = true;
    if (this.serieType === 'EXERCICE_1') this.showExercicesMode = true;
    if (this.serieType === 'EXERCICE_2') this.showExercicesMode = true;
    if (this.serieType === 'EXERCICE_3') this.showExercicesMode = true;

    //  if( this.evaluationMode ===true)
  }
  _base64ToArrayBuffer(base64) {
    const binary_string = window.atob(this.fileCourse);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  openCourseReminder() {
    window.open(this.chapter.coursePRstring, '_blank');
  }

  // getFile() {
  //   this.chapterService.getFileCart(cha);
  // }
  openConceptMap() {
    window.open(this.chapter.catre_conceptuelle, '_blank');
  }
}
