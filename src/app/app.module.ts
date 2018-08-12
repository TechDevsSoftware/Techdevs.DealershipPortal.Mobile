import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}
