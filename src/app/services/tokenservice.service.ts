import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'any'
})
export class TokenserviceService {
  userInfo = new BehaviorSubject(null);
  serverApi = environment.serverApi;
  token!: string;
  tokenresp;
  userconnected!: string;
  constructor(private http: HttpClient, private router: Router) {}
  login(user) {
    return this.http.post<User>(this.serverApi + 'Elearning/login', user, {
      observe: 'response'
    });
  }

  saveToken(jwt: string) {
    localStorage.removeItem('Authorization');

    localStorage.setItem('Authorization', jwt);
    this.token = jwt;
  }

  loadToken() {
    localStorage.getItem('Authorization');
  }

  getToken(): any {
    let _token = this.token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token));

    return this.tokenresp;
  }
  saveConnectedUser(UC: string) {
    localStorage.removeItem('userconnected');
    localStorage.setItem('userconnected', UC);
    this.userconnected = UC;
  }
  getUserconnected(): string {
    return localStorage.getItem('userconnected');
  }
  loggedIn() {
    return !!localStorage.getItem('Authorization');
  }

  logout() {

    window.sessionStorage.clear();
    localStorage.clear();

  }
}
