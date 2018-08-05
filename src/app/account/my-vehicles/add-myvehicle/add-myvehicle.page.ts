import { Component, OnInit } from "@angular/core";
import { UserVehicle } from "../../../models/app.models";
import { TechdevsAccountService } from "../../../services/techdevs-account.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "add-myvehicle",
  templateUrl: "./add-myvehicle.page.html",
  styleUrls: ["./add-myvehicle.page.scss"]
})
export class AddMyVehiclePage implements OnInit {
  vehicle: UserVehicle = new UserVehicle();
  showDetails = false;

  constructor(
    private accountService: TechdevsAccountService,
    private nav: NavController
  ) {}

  ngOnInit() {}

  async searchReg() {
    console.log("Searching", this.vehicle);
    this.vehicle = await this.accountService.searchRegistration(this.vehicle.registration).toPromise();
    this.showDetails = true;
    console.log("Lookup vehicle result", this.vehicle);
  }

  async addVehicle() {
    console.log("Adding Vehicle", this.vehicle);
    const result = await this.accountService.addMyVehicle(this.vehicle).toPromise();
    this.nav.goForward("/account/my-vehicles");
    console.log("New Vehicle", result);
  }
}
