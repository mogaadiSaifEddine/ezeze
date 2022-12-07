import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  serverApi = environment.serverApi;

  constructor(private http: HttpClient) {}

  getAllStudents() {
    const userId = JSON.parse(localStorage.getItem('user_details')).user_id;
    return this.http.get(this.serverApi + `Elearning/user/students/${userId}`);
  }
  addStudent(studentData: any, tokenID: any) {
    return this.http.post(`${this.serverApi}Elearning/user/student/${tokenID}`, studentData);
  }
  deleteStudent(id: any) {
    return this.http.delete(`${this.serverApi}Elearning/user/students/${id}`);
  }
  updateStudent(student: any, id: number) {
    return this.http.put(`${this.serverApi}Elearning/user/student/${id}`, student);
  }
}
