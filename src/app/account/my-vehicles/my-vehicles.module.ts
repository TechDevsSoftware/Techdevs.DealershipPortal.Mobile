import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { AddMyVehiclePage } from "./add-myvehicle/add-myvehicle.page";
import { MyVehiclesPage } from "./my-vehicles/my-vehicles.page";
import { TechdevsAccountService } from "../../services/techdevs-account.service";
import { MyVehiclePage } from "./my-vehicle/my-vehicle.page";


const routes: Routes = [
  {
    path: "",
    component: MyVehiclesPage
  },
  {
    path: "add",
    component: AddMyVehiclePage
  },
  {
    path: ":registration",
    component: MyVehiclePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddMyVehiclePage, MyVehiclesPage, MyVehiclePage],
  providers: [TechdevsAccountService]
})
export class MyVehiclesModule {}
