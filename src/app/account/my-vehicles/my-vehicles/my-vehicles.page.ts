import { Component, OnInit } from "@angular/core";
import { TechdevsAccountService } from "../../../services/techdevs-account.service";
import { UserVehicle } from "../../../models/app.models";
import { NavController } from "@ionic/angular";

@Component({
  selector: "my-vehicles",
  templateUrl: "./my-vehicles.page.html",
  styleUrls: ["./my-vehicles.page.scss"]
})
export class MyVehiclesPage implements OnInit {
  vehicles: UserVehicle[];
  loading: boolean;

  constructor(
    private accountService: TechdevsAccountService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const profile = await this.accountService.getUserProfile().toPromise();
    this.vehicles = profile.userData.myVehicles;

    console.log("Vehicles", this.vehicles);
    this.loading = false;
  }

  navToVehicle(registration: string) {
    this.nav.goForward(`/account/my-vehicles/${registration}`);
  }

  navToNewVehicle() {
    this.nav.goForward(`/account/my-vehicles/add`);
  }
}
