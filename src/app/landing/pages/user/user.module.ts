import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { SettingsComponent } from './settings/settings.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [DashboardComponent, CoursesComponent, WishlistComponent, CartComponent, SettingsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SlickCarouselModule
  ]
})
export class UserModule { }
