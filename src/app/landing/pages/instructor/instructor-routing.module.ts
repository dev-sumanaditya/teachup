import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpanelComponent } from './ipanel/ipanel.component';


const routes: Routes = [
  {path: '', component: IpanelComponent, children: [
    {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    {path: 'create', loadChildren: () => import('./pages/create/create.module').then(m => m.CreateModule)},
    {path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)},
    {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
