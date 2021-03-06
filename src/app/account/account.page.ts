import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { TechdevsAccountService } from "../services/techdevs-account.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"]
})
export class AccountPage implements OnInit, OnDestroy {
  user: any;
  constructor(
    private authService: AuthService,
    private accountService: TechdevsAccountService,
    private router: Router,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.user = await this.accountService.getUserProfile().toPromise();
    console.log(this.user);
  }

  ngOnDestroy(): void {}

  async login() {
    this.authService.startAuthentication().then(async x => {
      console.log("Logged In");
    });
  }

  logout() {
    this.authService.logout();
  }

  debug() {
    console.log({
      isLoggedIn: this.authService.isLoggedIn(),
      user: this.authService.getClaims()
    });
  }

  navToVehicles() {
    this.nav.goForward("/account/my-vehicles");
  }
}
