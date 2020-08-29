import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

const routes: Routes = [
  { path: "edit", component: EditUserComponent },
  { path: "", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
