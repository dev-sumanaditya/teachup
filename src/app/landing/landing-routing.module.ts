import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '', component: PanelComponent, children: [
    {path: 'webinars', loadChildren: () => import('./pages/webinars/webinars.module').then(m => m.WebinarsModule)},
    {path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)},
    {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
    {path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)},
    {path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
    {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
