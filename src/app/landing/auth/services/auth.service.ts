import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new ReplaySubject<User>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(shareReplay(1));
  public userInfo;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    if (user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (error) {
        this.currentUserSubject.next(null);
      }
    } else {
      this.currentUserSubject.next(null);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth`, { email, password })
      .pipe(
        tap((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  checkUser() {
    return localStorage.getItem('currentUser');
  }

  registerUser(email: string, password: string, role: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users`, { email, password, role })
      .pipe(
        map(
          user => {
            return user;
          },
          err => {
            return err;
          }
        )
      );
  }

  getUserData(uuid) {
    return this.http.get<any>(`${environment.apiUrl}/users/${uuid}`);
  }
}
