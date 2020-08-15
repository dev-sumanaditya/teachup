import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { LandingRoutingModule } from "./landing-routing.module";
import { PanelComponent } from "./panel/panel.component";
import { CartState } from "./store/states/cart.state";

@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxsModule.forFeature([CartState]),
  ],
  providers: [],
})
export class LandingModule {}
