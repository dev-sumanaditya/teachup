import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaymentRoutingModule } from "./payment-routing.module";
import { MainComponent } from "./main/main.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PaymentModule {}
