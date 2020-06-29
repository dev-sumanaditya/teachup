import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from '../helpers/auth.guard';


const routes: Routes = [
  {path: 'instructor', loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule)},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule), canActivate: [AuthGuard]},
  {path: '', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
