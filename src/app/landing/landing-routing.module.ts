import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '', component: PanelComponent, children: [
    {path: 'webinars', loadChildren: () => import('./pages/webinars/webinars.module').then(m => m.WebinarsModule)},
    {path: 'payment', loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule), canActivate: [AuthGuard]},
    {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
    {path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)},
    {path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
    // tslint:disable-next-line: max-line-length
    {path: 'instructor', loadChildren: () => import('./pages/instructor/instructor.module').then(m => m.InstructorModule), canActivate: [AuthGuard]},
    {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    {path: '404', loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundModule)},
    {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    {path: '**', redirectTo: '/404'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
