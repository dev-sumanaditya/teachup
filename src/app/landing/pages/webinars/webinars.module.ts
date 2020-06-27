import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebinarsRoutingModule } from './webinars-routing.module';
import { StartComponent } from './start/start.component';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    WebinarsRoutingModule
  ]
})
export class WebinarsModule { }
