import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from '../helpers/auth.guard';
import { AntiAuthGuard } from '../helpers/antiauth.guard';


const routes: Routes = [
  {path: 'instructor', loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule), canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [AntiAuthGuard]},
  {path: 'forgot', component: ForgotComponent, canActivate: [AntiAuthGuard]},
  {path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule), canActivate: [AuthGuard]},
  {path: 'challenge', loadChildren: () => import('./challenge/challenge.module').then(m => m.ChallengeModule), canActivate: [AntiAuthGuard]},
  {path: '', component: LoginComponent, canActivate: [AntiAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
