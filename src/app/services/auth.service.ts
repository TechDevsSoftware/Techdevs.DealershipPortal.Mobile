import { Injectable } from "@angular/core";
import { UserManager, UserManagerSettings, User } from "oidc-client";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor(
    private router: Router, 
    private httpClient: HttpClient
  ) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user ? this.user.profile : null;
  }
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  logout() {
    this.manager.signoutRedirect();
  }

  private clearUserState() {
    this.user = null;
    this.manager.clearStaleState();
    this.eraseCookie("idsrv.session");
  }
  private eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  redirectHome() {
    this.router.navigate(["/"]);
  }

  redirectMyAccount() {
    this.router.navigate(["/tabs", { outlets: { account: ["account"] } }]);
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    window.location.hash = decodeURIComponent(window.location.hash);
    return this.manager.signinRedirectCallback().then(user => {
      console.log("Signin complete - calling redirect");
      console.log("User", user);
      this.user = user;
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin
      );
      this.redirectMyAccount();
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.identityServer,
    client_id: environment.identityClientId,
    redirect_uri: `${environment.clientAddress}/auth-callback`,
    post_logout_redirect_uri: `${environment.clientAddress}`,
    response_type: "id_token token",
    scope: "openid profile api1 techdevs-accounts-api",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
