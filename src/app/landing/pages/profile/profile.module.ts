import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [InstructorProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
