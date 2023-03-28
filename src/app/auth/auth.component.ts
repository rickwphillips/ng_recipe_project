import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthRespData, AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | undefined;

  constructor( private authSvc: AuthService ) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit( authForm: NgForm ) {
    if (!authForm.valid) return;
    this.error = undefined;
    this.isLoading = true;

    const { email, password } = authForm.value;

    let authObs: Observable<AuthRespData> = this.isLoginMode ?
      this.authSvc.login(email, password) :
      this.authSvc.signUp(email, password);

    authObs.subscribe({
      next: resp => {
        console.log(resp);
        this.isLoading = false;
      },
      error: errorMessage => {
        console.warn(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });
  }
}
