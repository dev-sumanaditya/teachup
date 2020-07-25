import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    SlickCarouselModule
  ]
})
export class UserModule { }
