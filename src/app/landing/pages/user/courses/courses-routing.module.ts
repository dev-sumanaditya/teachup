import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  { path: "details/:id", component: DetailsComponent },
  { path: "", component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
