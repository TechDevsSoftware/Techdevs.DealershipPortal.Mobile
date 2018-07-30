import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./tabs/tabs.module#TabsPageModule"
  },
  {
    path: "auth-callback",
    component: AuthCallbackComponent
  },
  {
    path: "account",
    loadChildren: "./account/account.module#AccountPageModule"
  },
  {
    path: "login-loading",
    loadChildren: "./login-loading/login-loading.module#LoginLoadingPageModule"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
