import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  modulesContent: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  resetFormSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  exerciceSerie: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  chapter: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getChapterInfos() {}
  getExerciceSerieBychapter(chapterid?: number) {
    return this.http.get(environment.serverApi + `Elearning/serie_exercice/chapter/${chapterid}`);
  }
  getExerciceBySerie(serieId: number) {
    return this.http.get(environment.serverApi + `Elearning/serie/${serieId}`);
  }
  addUserAnswer(useranswer) {
    return this.http.post(environment.serverApi + `Elearning/UserAnswer/`, useranswer);
  }

  getLastExerciceId(userId): any {
    return this.http.get(environment.serverApi + `Elearning/UserAnswer/last/${userId}`);
  }
}
