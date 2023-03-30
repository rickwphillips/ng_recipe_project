import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor( private authSvc: AuthService ) {}

  ngOnInit() {
    if (this.authSvc.autoLogin()) this.authSvc.navigateTo('recipes').then();
  }


}
