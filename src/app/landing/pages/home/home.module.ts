import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { StartComponent } from "./start/start.component";
import { SharedModule } from "../shared/shared.module";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
