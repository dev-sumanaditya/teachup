import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap, shareReplay, retry } from 'rxjs/operators';
import { } from 'firebase/auth';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { error } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new ReplaySubject<User>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(shareReplay(1));
  public userInfo;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    //   const user = localStorage.getItem('currentUser');
    //   console.log(user);
    //   if (user) {
    //     try {
    //       this.currentUserSubject.next(JSON.parse(user));
    //     } catch (error) {
    //       this.currentUserSubject.next(null);
    //     }
    //   } else {
    //     this.currentUserSubject.next(null);
    //   }
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  checkUser() {
    return localStorage.getItem('currentUser');
  }

  async loginWithGoogle() {
    return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async registerUser(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = await this.afAuth.currentUser;
    await user.sendEmailVerification();
    return user;
  }

  getUserData(uuid) {
    return this.http.get<any>(`${environment.apiUrl}/users/${uuid}`);
  }
}
