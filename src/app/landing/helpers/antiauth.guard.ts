import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({ providedIn: 'root' })
export class AntiAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = await this.afAuth.user;
        user.subscribe(data => {
          if (data) {
            this.router.navigate(['/']);
            return false;
          }
        });
        return true;
    }
}
