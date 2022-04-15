import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './core/header/header.component';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {PagesModule} from "./feature/pages/pages.module";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import {AuthService} from "./auth/auth.service";
import {AuthInterceptor} from "./core/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    PagesModule,
    RouterModule,
    AuthModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (authService: AuthService) => {
    //     return () => authService.authenticate$()
    //   },
    //   deps: [AuthService],
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ]
})
export class AppModule { }
