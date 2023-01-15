import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseSeries } from 'src/app/model/CourseSeries';
import { AnswerFeedback, Exercice } from 'src/app/model/Exercice';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { RevisionService } from 'src/app/services/revision.service';
import { UserService } from 'src/app/services/userservice.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.scss']
})
export class PassTestComponent implements OnInit {
  @Input() evaluationContent: CourseSeries;
  @Output() finalScore: EventEmitter<number> = new EventEmitter<number>();
  exerciceIndex = 0;
  canGoNextQuestion!: boolean;
  isAnswerChecked = false;
  currentExercise: Exercice;
  answerFeedback!: AnswerFeedback;

  score = 0;
  readonly TYPES = Exercise_Types;
  answer: boolean = null;
  UserId;

  loading = true;

  constructor(
    private revisionService: RevisionService,
    private userService: UserService,
    private ss: SharedService
  ) { }

  ngOnInit(): void {

    const userconnected = JSON.parse(localStorage.getItem('user_details'));
    this.UserId = userconnected.user_id;
    this.revisionService.getLastExerciceId(this.UserId).subscribe((res) => {
      this.currentExercise = this.evaluationContent.exercices.find((ex) => ex.ex_id === res.id) || this.evaluationContent.exercices[0];
      this.loading = false;
    }, (error) => {
      this.currentExercise = this.evaluationContent.exercices[0];
      this.loading = false;
    });

  }

  nextQuestion() {
    if (this.currentExercise.ex_id === this.evaluationContent.exercices[this.evaluationContent.exercices.length - 1].ex_id) {
      this.finalScore.emit(this.score);
    } else {
      this.revisionService.resetFormSub.next(true);
      this.answer = null;
      this.isAnswerChecked = false;
      this.exerciceIndex++;
      this.currentExercise = this.evaluationContent.exercices[this.exerciceIndex];
      this.canGoNextQuestion = false;
    }
    this.ss.showFalfoul.next(false);

  }
  private sendUserAnswerToTheServer() {
    const userAnswer = {
      id: this.currentExercise.ex_id,
      score: this.score,
      scoreToSend: this.answer ? 1 : 0,
      serie: this.evaluationContent.seriesType,

      user: this.UserId
    };
    if (userAnswer.id !== null)
      this.revisionService.addUserAnswer({ ...userAnswer, score: userAnswer.scoreToSend }).subscribe((res) => { });
    if (this.answer) {
      this.score = this.score + 100 / this.evaluationContent.exercices.length;
    }
  }

  canGoNext(event) {
    this.canGoNextQuestion = event;
  }
  checkAnswer() {


    if (this.answer !== null) {
      this.sendUserAnswerToTheServer();
      this.isAnswerChecked = true;
      if (this.answer) {
        this.ss.showFalfoul.next(true);
        this.ss.answerIsCorrect.next(true);
      } else {
        this.ss.showFalfoul.next(true);
        this.ss.answerIsCorrect.next(false);
      }
      this.currentExercise = { ...this.currentExercise, blocks: this.currentExercise.blocks.map(b => ({ ...b, value: b.correctValue ? b.correctValue : b.value })) };
    }
  }
}
