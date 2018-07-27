import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TechdevsAccountService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  getUserProfile() {
    return this.httpClient.get(`http://localhost:5001/api/v1/account`, {
      headers: { Authorization: this.authService.getAuthorizationHeaderValue() }
    });
  }
}
