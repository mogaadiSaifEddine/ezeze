import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Group, School, User } from '../model/User';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverApi = environment.serverApi;
  static currentuser: any = {};
  constructor(private http: HttpClient) {}
  baseUrl = this.serverApi + 'Elearning/resetpassword/{email}/{newpass}/{cofirm}';
  findalluser(): Observable<any> {
    return this.http.get(this.serverApi + 'Elearning/all');
  }

  /* signup(user:User):Observable<any>{
    return this.http.post<User>(this.serverApi+"Elearning/add",user),httpOptions;
    }*/
  signup(user): Observable<any> {
    return this.http.post(
      this.serverApi + 'Elearning/user/parent',
      {
        username: user.username,
        password: user.password,
        profession: user.profession,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        datenaissance: user.datenaissance,
        phone: user.phone,
        sexe: user.sexe,
        confirmepassword: user.confirmepassword
      },
      httpOptions
    );
  }
  ResetPassword(email: string, newpass: string, cofirm: string) {
    return this.http.post(`${this.baseUrl}` + `/create`, { email, newpass, cofirm });
  }
  Activecompte(username: string) {
    const url = this.serverApi + `Elearning/activecompte/${username}`;
    return this.http.put<User>(url, username);
  }
  getUser(username: string) {
    const url = this.serverApi + `Elearning/user/username/${username}`;
    return this.http.get<User>(url);
  }
  getGroups() {
    return this.http.get<Group[]>(this.serverApi + 'Elearning/group/');
  }
  getSchoolsList() {
    // return this.http.get<School[]>(this.serverApi + "Elearning/school/")
    return this.http.get<Group[]>(this.serverApi + 'Elearning/group/');
  }
  deleteUser(userID) {
    const url = this.serverApi + `Elearning/user/${userID}`;
    return this.http.delete(url);
  }
  addAdvisor(){
    return this.http.post(this.serverApi+'', {
      username: "advisor2",
      password: "advisor2",
      profession: "user.profession",
      firstname: "Advisor",
      lastname: "Advisor",
      email: "advi@gmail.com",
      datenaissance: "",
      phone: "92108619",
      sexe: "homme",
      confirmepassword: "advisor2"
    })
  }
}
