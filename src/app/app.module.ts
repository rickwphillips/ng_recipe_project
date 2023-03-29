import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipesModule } from "./recipes/recipes.module";
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
