import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLoading = new Subject<boolean>();
  showManageStudentAccountGuide = new BehaviorSubject(false);
  reloadStudentsList = new BehaviorSubject(false);
  showFalfoul = new BehaviorSubject(false);
  answerIsCorrect = new BehaviorSubject(false);
  studentStatus = new BehaviorSubject('actif');
  currentCount = 0;
  currentToken = null;
  currentTokenData = null;
  serverApi = environment.serverApi;
  constructor(private http: HttpClient) {}
  show() {
    console.log('showing');

    this.isLoading.next(true);
  }

  hide() {
    console.log('hiding');

    this.isLoading.next(false);
  }
}
