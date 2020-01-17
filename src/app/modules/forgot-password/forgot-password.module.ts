import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule, CoreModule]
})
export class ForgotPasswordModule {}
