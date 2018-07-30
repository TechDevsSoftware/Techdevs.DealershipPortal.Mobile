import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ThrowStmt } from "../../../node_modules/@angular/compiler";

@Component({
  selector: "app-auth-callback",
  templateUrl: "./auth-callback.component.html",
  styleUrls: ["./auth-callback.component.scss"]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.location.subscribe(x => this.runRedirect());
  }

  ngOnInit() {
    this.runRedirect();
  }

  runRedirect() {
    try {
      this.authService.completeAuthentication().then(x => {
        // this.authService.redirectMyAccount();
      });
    } catch (error) {
      console.log("Caught an error", error);
      // this.navigateHome();
    }
  }

  navigateHome() {
    this.router.navigate(["/tabs", { outlets: { home: ["home"] } }]);
  }
}
