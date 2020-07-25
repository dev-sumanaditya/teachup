import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { StartComponent } from './start/start.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    ReactiveFormsModule
  ]
})
export class InfoModule { }
