import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { IpanelComponent } from './ipanel/ipanel.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [IpanelComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    QuillModule.forRoot()
  ]
})
export class InstructorModule { }
