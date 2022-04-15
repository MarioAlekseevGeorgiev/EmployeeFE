import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {ILogin} from "../core/interfaces/login";
import {IRegister} from "../core/interfaces/register";
import {IUser} from "../core/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  private _currentUser = new BehaviorSubject<IUser>(undefined);
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private httpClient: HttpClient) { }

  register$(userData: IRegister): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiBaseUrl}/user/register`, userData, {withCredentials: true});
  }

  login$(loginData: ILogin): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiBaseUrl}/user/login`, loginData, {withCredentials: true});
  }

  authenticate$(): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiBaseUrl}/user/authenticate`, {withCredentials: true})
      .pipe(tap(currentUser => this.handleLastLoggedUser(currentUser)),
                     catchError( () => {
                       return EMPTY;
                     }));
  }

  handleLastLoggedUser(lastLoggedUser: IUser) {
    console.log('lastLoggedUser' + lastLoggedUser);
    this._currentUser.next(lastLoggedUser);
  }

  logout$() {
    // @ts-ignore
    this._currentUser.next(undefined);
  }
}
