import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  constructor(private http: HttpClient) {}

  deleteExercice(id: number) {
    return this.http.delete(environment.serverApi + 'Elearning/' + 'exercice/' + id);
  }
  addExercice(exercice, serieId: number) {
    return this.http.post(environment.serverApi + 'Elearning/' + 'exercice/' + serieId, exercice);
  }
  addExerciceBlockFile(files: any[], blockId: number) {
    console.log(files);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('file', file, file.name + index);
    });
    return this.http.post(environment.serverApi + 'Elearning/' + 'block_exercice/file/' + blockId, formData);
  }
  updateExercice(exercice, id: number) {
    return this.http.put(environment.serverApi + 'Elearning/' + 'exercice/' + id, exercice);
  }

  getSerieByChapter(chapterId: number) {
    return this.http.get(environment.serverApi + 'Elearning/serie_exercice/chapter/' + chapterId);
  }
  getSerieById(serieId: number) {
    return this.http.get(environment.serverApi + 'Elearning/serie_exercice/' + serieId);
  }

  async uploadFile(file: File, exercice_id: number) {
    const formData = new FormData();
    formData.set('file', file);

    return this.http.post(environment.serverApi + 'Elearning/' + 'exercice/file/' + exercice_id, formData);
  }

  getFile(file_id: number) {
    return this.http.get(environment.serverApi + 'Elearning/' + 'exercice/file/' + file_id, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'image/png'
      }
    });
  }
}
