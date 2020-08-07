import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { UpdatesComponent } from './updates/updates.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CourseComponent, UpdatesComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CourseComponent,
    UpdatesComponent
  ]
})
export class SharedModule { }
