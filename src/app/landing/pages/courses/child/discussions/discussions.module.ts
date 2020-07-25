import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionsRoutingModule } from './discussions-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DiscussionsRoutingModule
  ]
})
export class DiscussionsModule { }
