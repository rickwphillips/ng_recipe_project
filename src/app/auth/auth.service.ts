import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

const API_KEY = 'AIzaSyCz0x0VpvD8UaVJExoHsmtgeMfbDzggtwg';
const SIGNUP_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
const AUTH_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ API_KEY;
export interface AuthRespData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiredIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  signUp( email: string, password: string ): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(SIGNUP_API, {
      email, password, returnSecureToken: true
    }).pipe(
      catchError( errorRes => this.handleError(errorRes))
    );
  }

  login( email: string, password: string): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(AUTH_API, {
      email, password, returnSecureToken: true
    }).pipe(
      catchError( errorRes => this.handleError(errorRes))
    );
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
        errorMessage = 'Invalid username/password combination';
    }

    return throwError( () => new Error(errorMessage));
  }
}
