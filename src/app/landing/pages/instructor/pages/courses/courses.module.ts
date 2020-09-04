import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoursesRoutingModule } from "./courses-routing.module";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";

@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
  ],
})
export class CoursesModule {}
