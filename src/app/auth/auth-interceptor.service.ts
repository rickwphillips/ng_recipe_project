import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor( private authSvc: AuthService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return this.authSvc.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user?.token) return next.handle(req);
        
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token!)
        });
        
        return next.handle(modifiedReq);
      })
    )
  }
}
