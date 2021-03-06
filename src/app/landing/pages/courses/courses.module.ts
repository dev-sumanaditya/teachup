import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [StartComponent, CategoryComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
