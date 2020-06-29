import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [RegisterComponent, ReviewComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
