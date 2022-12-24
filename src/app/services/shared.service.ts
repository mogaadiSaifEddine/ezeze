import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showManageStudentAccountGuide = new BehaviorSubject(false);
  reloadStudentsList = new BehaviorSubject(false);
  showFalfoul = new BehaviorSubject(false);
  answerIsCorrect = new BehaviorSubject(false);
  studentStatus = new BehaviorSubject('actif')
  currentCount = 0;
  currentToken = null;
  currentTokenData = null;

  serverApi = environment.serverApi;
  constructor(
    private http:HttpClient
  ) { }

}
