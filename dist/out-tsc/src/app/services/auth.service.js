"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var oidc_client_1 = require("oidc-client");
var router_1 = require("@angular/router");
var AuthService = /** @class */ (function () {
    function AuthService(router) {
        var _this = this;
        this.router = router;
        this.manager = new oidc_client_1.UserManager(getClientSettings());
        this.user = null;
        this.manager.getUser().then(function (user) {
            _this.user = user;
        });
    }
    AuthService.prototype.isLoggedIn = function () {
        return this.user != null && !this.user.expired;
    };
    AuthService.prototype.getClaims = function () {
        return (this.user) ? this.user.profile : null;
    };
    AuthService.prototype.getAuthorizationHeaderValue = function () {
        return this.user.token_type + " " + this.user.access_token;
    };
    AuthService.prototype.logout = function () {
        console.log("Logging out");
        return this.manager.signoutRedirect();
    };
    AuthService.prototype.startAuthentication = function () {
        return this.manager.signinRedirect();
    };
    AuthService.prototype.completeAuthentication = function () {
        var _this = this;
        return this.manager.signinRedirectCallback().then(function (user) {
            console.log("Signin complete - calling redirect");
            console.log("User", user);
            _this.user = user;
            _this.router.navigate(["/tabs", { outlets: { account: ['account'] } }]);
        });
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
function getClientSettings() {
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
exports.getClientSettings = getClientSettings;
//# sourceMappingURL=auth.service.js.map