import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Chapter } from '../model/Chapter';
import { ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChapitreServiceService {
  chapter: Chapter;
  serverApi = environment.serverApi;
  constructor(private _http: HttpClient) {}

  //   ajouterchapitre(chapitre:Chapter):Observable<any>{
  //    return  this._http.post(this.serverApi+"Elearning/Chapter",{ chapitre,
  //      NomChap:chapitre.name,
  //      module:chapitre.module.name,
  //      course:chapitre.course,
  //      Chapprerquis:chapitre.pre_required_chapter,
  // },httpOptions);
  //       }

  //      ajouterchapitre(chapitre):Observable<any>{
  //
  //  return  this._http.post(this.serverApi+"Elearning/Chapter", {name:chapitre.NomChap,course:{name:chapitre.Course},module:{name:chapitre.Module},pre_required_chapter:{name:chapitre.ChapPrerquis}} ,httpOptions)

  //     }
  ajouterchapitre(chapitre, id: number): Observable<any> {

    return this._http.post(
      this.serverApi + 'Elearning/Chapter/' + id,
      { name: chapitre.NomChap, course: { name: chapitre.Course }, module: { name: chapitre.Module }, pre_required_chapter: { name: chapitre.ChapPrerquis } },
      httpOptions
    );
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  getchapitre() {
    return this._http.get<Chapter[]>(this.serverApi + 'Elearning/Chapter');
  }
  getPreRequis() {
    return this._http.get<any[]>(' http://localhost:8081/Elearning/PreRequired');
  }
}
