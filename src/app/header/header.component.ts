import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(
    private dataSvc: DataStorageService,
    private authSvc: AuthService ) {}

  ngOnInit() {
    this.userSub = this.authSvc.user.subscribe( (user: User | null) => {
      this.isAuthenticated = !!user?.token;
    })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }


  onSaveData() {
    this.dataSvc.storeRecipes();
  }

  onFetchData() {
    this.dataSvc.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authSvc.logout();
  }
}
