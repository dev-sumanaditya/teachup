import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { HomeComponent } from './home/home.component';

import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    ImageCropperModule
  ]
})
export class CreateModule { }
