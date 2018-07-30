import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AccountPage } from "./account.page";
import { TechdevsAccountService } from "../services/techdevs-account.service";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: "",
    component: AccountPage
  },
  {
    path: "my-vehicles",
    loadChildren: "./my-vehicles/my-vehicles.module#MyVehiclesModule"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [AccountPage],
  providers: [TechdevsAccountService]
})
export class AccountPageModule {}
