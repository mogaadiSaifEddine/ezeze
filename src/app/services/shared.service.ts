import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showManageStudentAccountGuide = new BehaviorSubject(false);
  reloadStudentsList = new BehaviorSubject(false);
  showFalfoul = new BehaviorSubject(false);
  answerIsCorrect = new BehaviorSubject(false);
  currentCount = 0;
  currentToken = null;
  currentTokenData = null;

  constructor() { }
}
