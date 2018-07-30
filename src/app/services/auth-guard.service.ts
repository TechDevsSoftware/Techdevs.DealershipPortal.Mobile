import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(): boolean {
    console.log("Checking auth guard.", {'UserLoggedIn': this.authService.isLoggedIn()});
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login-loading']);
    return false;
  }
}
