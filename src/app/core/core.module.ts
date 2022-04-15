import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {ErrorHandlerInterceptor} from "./error-handler.interceptor";
import { ClockComponent } from './clock/clock.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ClockComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ClockComponent
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   multi: true,
        //   useClass: AuthInterceptor
        // },
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: ErrorHandlerInterceptor
        }
      ]
    }
  }

}
