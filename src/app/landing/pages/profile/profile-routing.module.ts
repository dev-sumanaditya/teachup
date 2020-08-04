import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';


const routes: Routes = [
  {path: 'instructor', component: InstructorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
