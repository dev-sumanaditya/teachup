import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AntiAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.currentUserSubject.pipe(map(data => {
          if (data !== null) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }), take(1));
    }
}
