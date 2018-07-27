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
var http_1 = require("@angular/common/http");
var auth_service_1 = require("./auth.service");
var TechdevsAccountService = /** @class */ (function () {
    function TechdevsAccountService(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
    }
    TechdevsAccountService.prototype.getUserProfile = function () {
        return this.httpClient.get("http://localhost:5001/api/v1/account", {
            headers: { Authorization: this.authService.getAuthorizationHeaderValue() }
        });
    };
    TechdevsAccountService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            auth_service_1.AuthService])
    ], TechdevsAccountService);
    return TechdevsAccountService;
}());
exports.TechdevsAccountService = TechdevsAccountService;
//# sourceMappingURL=techdevs-account.service.js.map