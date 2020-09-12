import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Store } from "@ngxs/store";
import { CartState } from "../../store/states/cart.state";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  currentUserSubject = new ReplaySubject<any>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(shareReplay(1));
  public userInfo;
  jwtToken = "";

  homePageSignupSubject = new ReplaySubject<any>(1);
  signupEmail = this.homePageSignupSubject.asObservable();

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private store: Store,
    private ngZone: NgZone
  ) {
    // this.afAuth.authState.subscribe((data) => console.log(data));
    this.afAuth.authState.subscribe(async (user) => {
      try {
        if (!user) {
          throw new Error("User not found");
        }
        this.jwtToken = await (await this.afAuth.currentUser).getIdToken(true);
        const data = await this.http
          .post<any>(environment.apiUrl + "/user", user, {
            headers: { Authorization: `${this.jwtToken}` },
          })
          .toPromise();
        this.updateUser({ ...user });
        this.currentUserSubject.next(data.data);
      } catch (err) {
        this.currentUserSubject.next(null);
      }
    });
  }

  async setAuthPersistance() {
    await this.afAuth.setPersistence(auth.Auth.Persistence.LOCAL);
  }
  async login(email: string, password: string) {
    await this.setAuthPersistance();
    const user = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.jwtToken = await (await this.afAuth.currentUser).getIdToken(true);
    return await this.http
      .get<any>(environment.apiUrl + "/user/" + user.user.uid)
      .toPromise();
  }

  async loginWithGoogle() {
    await this.setAuthPersistance();
    return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async loginWithFacebook() {
    await this.setAuthPersistance();
    return await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  async registerUser(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = await this.afAuth.currentUser;
    await user.sendEmailVerification();
    return await this.http
      .post<any>(environment.apiUrl + "/user", user)
      .toPromise();
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

  async updateUser(user) {
    const { data } = await this.http
      .put<any>(environment.apiUrl + "/user", user, {
        headers: { Authorization: `${this.jwtToken}` },
      })
      .toPromise();
    this.currentUserSubject.next({ ...data });
    return;
  }

  async sendEmailVerification() {
    const user = await this.afAuth.currentUser;
    return await user.sendEmailVerification();
  }

  async setSignupEmail(data: string) {
    this.homePageSignupSubject.next(data);
  }
}
