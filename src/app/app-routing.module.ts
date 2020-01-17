import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./core/guard/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./modules/landing/landing.module").then(m => m.LandingModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./modules/forgot-password/forgot-password.module").then(
        m => m.ForgotPasswordModule
      )
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
