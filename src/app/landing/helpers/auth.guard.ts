import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = await this.afAuth.user;
        if (!user) {
          this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true;
    }
}
