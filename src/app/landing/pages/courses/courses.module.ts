import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CourseinfoComponent } from './courseinfo/courseinfo.component';

@NgModule({
  declarations: [StartComponent, CategoryComponent, CourseinfoComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
