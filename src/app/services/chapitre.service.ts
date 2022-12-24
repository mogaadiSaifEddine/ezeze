import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter, ChapterChildren, ChapterType } from '../model/Chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapitreService {
  serverApi = environment.serverApi;
  constructor(private http: HttpClient) {}
  user_id = JSON.parse(localStorage.getItem('user_details')).user_id;
  chapterList = new BehaviorSubject<ChapterChildren[]>(null);

  getchapitre() {
    return this.http.get<Chapter[]>(this.serverApi + 'Elearning/' + 'Chapter/teacher/' + this.user_id);
  }
  getInvalidChapters(){
    return this.http.get<Chapter[]>(this.serverApi + 'Elearning/Chapter/advisor/' );
  }
  deleteChapter(id: number) {
    return this.http.delete(this.serverApi + 'Elearning/' + 'Chapter/' + id);
  }

  addChapter(
    chapter: {
      name: string;
      ChapterType: ChapterType;
      matiere: number;
      resumer_cour: Blob;
      catre_conceptuelle: Blob;
      group: number;
      chapter_id?: number;
    },
    group_id: number
  ) {
    return this.http.post(this.serverApi + 'Elearning/' + 'Chapter/' + group_id + '/' + this.user_id + '/' + (chapter.matiere || 0), chapter);
  }

  async uploadFile(file: File, chapter_id: number) {
    const formData = new FormData();
    formData.set('file', file);
    console.log(file);

    return this.http.post(this.serverApi + 'Elearning/' + 'chapter/cart/' + chapter_id, formData);
  }
  async uploadVideo(file: File, chapter_id: number) {
    const formData = new FormData();
    formData.set('file', file);
    console.log(file);

    return this.http.post(this.serverApi + 'Elearning/' + 'chapter/course/' + chapter_id, formData);
  }

  getFile(file_id: number) {
    console.log(
      this.http.get(this.serverApi + 'Elearning/' + 'chapter/cart/' + file_id, {
        responseType: 'blob'
      })
    );

    return this.http.get(this.serverApi + 'Elearning/' + 'chapter/cart/' + file_id, {
      responseType: 'blob'
    });
  }
  getFileCart(file_id: number) {
    return this.http.get(environment.serverApi + 'Elearning/' + 'chapter/cart/' + file_id, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'image/png'
      }
    });
  }
  getFileCourse(file_id: number) {
    return this.http.get(environment.serverApi + 'Elearning/' + 'chapter/course/' + file_id, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'image/png'
      }
    });
  }

  getMatieres() {
    return this.http.get(this.serverApi + 'Elearning/' + 'Chapter/matieres/');
  }

  updateChapter(chapter: Chapter, chapter_id: number, group_id: number) {
    return this.http.put(this.serverApi + 'Elearning/' + 'Chapter/' + chapter_id + '/' + group_id + '/', chapter);
  }

  getChaptersByGroup(group_id: number) {
    return this.http.get(this.serverApi + 'Elearning/' + 'Chapter/matieres/' + group_id); // +group_id
  }
  changeFile(file: File) {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(new Blob([<string>reader.result], { type: 'blob' }));
      reader.onerror = (error) => reject(error);
    });
  }

  getOneChapter(matierId: number) {
    return this.http.get(this.serverApi + 'Elearning/' + 'Chapter/chap_mat/' + matierId);
  }
}
