import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';import { CourseSeries } from '../model/CourseSeries';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: 'root'
})
export class ExcerciceserviceService {

  constructor(private _http:HttpClient) { }
  ajouterserieexetblock(exercice,id:number):Observable<any>{

    return  this._http.post("http://localhost:8081/Elearning/serie_exercice/"+id,
      // {name:chapitre.NomChap,course:{name:chapitre.Course}
      // ,module:{name:chapitre.Module}
      // ,pre_required_chapter:{name:chapitre.ChapPrerquis}} ,httpOptions)
      {
        name:exercice.name,
        description: exercice.description,
        seriesType:exercice.seriesType,
        exercices:[{
          name:exercice.nameex,
          difficulty:exercice.diff,
          type:exercice.typeEx,
          question:exercice.question,
          blocks: [
            {
              label:exercice.label,
              placeholder:exercice.placeholder,
              value:exercice.value,
              correctValue:exercice.correctValue,
              exerciceBlockType:exercice.exerciceBlockType
            }]
        }]
      },httpOptions);}
  GetSerieExercice() {
    return this._http.get<CourseSeries[]>("http://localhost:8081/Elearning/serie_exercice");
  }
}

