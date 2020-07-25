import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { StartComponent } from './start/start.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChallengeModule { }
