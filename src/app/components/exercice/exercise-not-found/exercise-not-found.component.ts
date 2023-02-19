import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import * as _ from 'lodash';

@Component({
  selector: 'ines-exercise-not-found',
  templateUrl: './exercise-not-found.component.html',
  styleUrls: ['./exercise-not-found.component.scss']
})
export class ExerciseNotFoundComponent implements OnInit {

  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  forceCanGoNext() {
    this.answerChange.emit(true);
    this.canGoNext.emit(true);
  }

}
