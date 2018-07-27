import { Injectable } from "@angular/core";
import { UserManager, UserManagerSettings, User } from "oidc-client";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor(private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return (this.user) ? this.user.profile : null;
  }
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  logout() {
    console.log("Logging out");
    return this.manager.signoutRedirect();
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log("Signin complete - calling redirect");
      console.log("User", user);
      this.user = user;
      this.router.navigate(["/tabs", { outlets: { account: ['account'] } }]);
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: "http://localhost:5000",
    client_id: "spa",
    redirect_uri: "http://localhost:8100/auth-callback",
    post_logout_redirect_uri: "http://localhost:8100",
    response_type: "id_token token",
    scope: "openid profile api1 techdevs-accounts-api",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
