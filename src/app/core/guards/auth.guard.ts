import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | UrlTree {

      // @ts-ignore
      return this.authService.isLoggedIn$.pipe(take(1),

        map(isLoggedIn => {
          if (isLoggedIn){
            return true;
          }
          return this.router.navigate(['home']
            // , {
            //   queryParams: {
            //     'redirect-to': '/' + route.url.map(f => f.path).join('/')
            //   }
            // }
          );
        }));
    }

}
