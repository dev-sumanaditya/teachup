import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ImageCropperModule } from "ngx-image-cropper";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { EditFormComponent } from "./components/edit-form/edit-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DashboardComponent, EditUserComponent, EditFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SlickCarouselModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
