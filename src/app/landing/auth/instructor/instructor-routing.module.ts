import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'review', component: ReviewComponent},
  {path: '', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
