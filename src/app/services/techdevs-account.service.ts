import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UserVehicle, UserProfile } from "../models/app.models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TechdevsAccountService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`http://localhost:5001/api/v1/account`, {
      headers: { Authorization: this.authService.getAuthorizationHeaderValue() }
    });
  }

  addMyVehicle(vehicle: UserVehicle) {
    const options = {
      headers: { Authorization: this.authService.getAuthorizationHeaderValue() }
    };
    return this.httpClient.post(
      `http://localhost:5001/api/v1/account/myvehicles`,
      vehicle,
      options
    );
  }

  removeVehicle(registration: string) {
    const params: HttpParams = new HttpParams();
    params.append("registration", registration);
    const options = {
      headers: {
        Authorization: this.authService.getAuthorizationHeaderValue()
      },
      params: params
    };
    return this.httpClient.delete(
      `http://localhost:5001/api/v1/account/myvehicles`,
      options
    );
  }
}
