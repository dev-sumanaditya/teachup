import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { UpdatesComponent } from './updates/updates.component';



@NgModule({
  declarations: [CourseComponent, UpdatesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CourseComponent,
    UpdatesComponent
  ]
})
export class SharedModule { }
