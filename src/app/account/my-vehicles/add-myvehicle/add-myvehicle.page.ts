import { Component, OnInit } from "@angular/core";
import { UserVehicle } from "../../../models/app.models";
import { TechdevsAccountService } from "../../../services/techdevs-account.service";
import { NavController, ToastController } from "@ionic/angular";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "add-myvehicle",
  templateUrl: "./add-myvehicle.page.html",
  styleUrls: ["./add-myvehicle.page.scss"]
})
export class AddMyVehiclePage implements OnInit {
  vehicle: UserVehicle = new UserVehicle();
  showDetails = false;
  errorMessage: string;
  constructor(
    private accountService: TechdevsAccountService,
    private nav: NavController,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd &&
            event.url === "/account/my-vehicles/add"
        )
      )
      .subscribe(() => this.resetPage());
  }

  resetPage() {
    this.vehicle = new UserVehicle();
    this.showDetails = false;
    this.errorMessage = null;
  }

  async searchReg() {
    console.log("Searching", this.vehicle);

    const result = await this.accountService
      .searchRegistration(this.vehicle.registration)
      .toPromise();

    if (result == null) {
      this.showMessage("Vehicle not found! Please enter your vehicle details").then();
    }
    this.showDetails = true;
    console.log("Lookup vehicle result", this.vehicle);
  }

  async addVehicle() {
    console.log("Adding Vehicle", this.vehicle);
    const result = await this.accountService
      .addMyVehicle(this.vehicle)
      .toPromise();
    this.nav.goForward("/account/my-vehicles");
    console.log("New Vehicle", result);
  }

  async showMessage(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
