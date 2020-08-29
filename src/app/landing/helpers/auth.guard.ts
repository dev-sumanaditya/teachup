import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../auth/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { take, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.currentUserSubject.pipe(
      map((data) => {
        if (data === null) {
          this.router.navigate(["/auth"], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
