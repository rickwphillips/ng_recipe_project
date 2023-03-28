import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

const API_KEY = 'AIzaSyCz0x0VpvD8UaVJExoHsmtgeMfbDzggtwg';
const SIGNUP_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
const AUTH_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ API_KEY;
export interface AuthRespData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  user = new BehaviorSubject<User>(new User('', ''));
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

  signUp( email: string, password: string ): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(SIGNUP_API, {
      email, password, returnSecureToken: true
    }).pipe(
      catchError( errorRes => this.handleError(errorRes)),
      tap( resData => this.handleAuthentication(resData))
    );
  }

  login( email: string, password: string ): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(AUTH_API, {
      email, password, returnSecureToken: true
    }).pipe(
      catchError( errorRes => this.handleError(errorRes)),
      tap( resData => this.handleAuthentication(resData))
    );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    const parsedData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userData);

    const loadedUser = new User(
      parsedData.email,
      parsedData.id,
      parsedData._token,
      new Date(parsedData._tokenExpirationDate)
    );

    if (!loadedUser.token) return;

    this.user.next(loadedUser);
    const expirationDuration = new Date(parsedData._tokenExpirationDate).getTime() -
      new Date().getTime();
    this.autoLogout(expirationDuration);

  }
  logout() {
    this.user.next(new User('', ''));
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/auth']).then();
  }

  autoLogout( duration: number ) {
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = setTimeout( () => this.logout(), duration);
  }

  private handleError( errorRes: HttpErrorResponse ) {
    let errorMessage = 'An unknown error occurred.';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_PASSWORD':
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid username/password combination';
        break;
      default:
        // do nothing
    }

    return throwError( () => new Error(errorMessage));
  }

  handleAuthentication( resData: AuthRespData ) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+resData.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  ngOnDestroy() {
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }
}
