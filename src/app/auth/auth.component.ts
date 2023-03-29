import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthRespData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective | undefined;
  isLoginMode = true;
  isLoading = false;
  error: string | undefined;
  closeSub: Subscription | undefined;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
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
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']).then();
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });
  }

  showErrorAlert( message: string ) {
    const alertCmpFactory = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef?.clear();

    const componentRef = hostViewContainerRef?.createComponent(alertCmpFactory);

    componentRef!.instance.message = message;
    this.closeSub = componentRef!.instance.close
      .subscribe({
        next: () => {
          this.closeSub?.unsubscribe();
          hostViewContainerRef?.clear();
        }
      })

  }
}
