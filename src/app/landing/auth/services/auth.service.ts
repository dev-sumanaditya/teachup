import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CartState } from '../../store/states/cart.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new ReplaySubject<any>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(shareReplay(1));
  public userInfo;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {
    afAuth.onAuthStateChanged(user => {
      if (!user) {
        return this.router.navigate['/'];
      }
      this.currentUserSubject.next(user);
    });

    this.afAuth.user.subscribe(data => {
      if (data) {
        this.currentUserSubject.next(data);
      }
    });
  }

  async setAuthPersistance() {
    await this.afAuth.setPersistence(auth.Auth.Persistence.LOCAL);
  }

  async login(email: string, password: string) {
    await this.setAuthPersistance();
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle() {
    await this.setAuthPersistance();
    return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async registerUser(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = await this.afAuth.currentUser;
    await user.sendEmailVerification();
    return user;
  }

  logout() {
    this.afAuth.signOut();
    this.currentUserSubject.next(null);
    this.store.reset(CartState);
  }

  getUserData(uuid) {
    return this.http.get<any>(`${environment.apiUrl}/users/${uuid}`);
  }

  async verifyForgot(email) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  async resetPassword(token, pass) {
    return await this.afAuth.confirmPasswordReset(token, pass);
  }

  async verifyEmail(token) {
    return await this.afAuth.applyActionCode(token);
  }

  async updateUser(fname, lname) {
    (await this.afAuth.currentUser).updateProfile({
      displayName: fname + ' ' + lname
    });
  }

  async getUser() {
    await this.afAuth.user.subscribe(e => {
      console.log(e);
    });
  }
}
