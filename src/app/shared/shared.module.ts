import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from "./dropdown.directive";
import { FilterPipe } from "./pipes/filter.pipe";
import { ShortenPipe } from "./pipes/shorten.pipe";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { RouterLink, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    DropdownDirective,
    PlaceholderDirective,
    FilterPipe,
    ShortenPipe,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [
    DropdownDirective,
    PlaceholderDirective,
    FilterPipe,
    ShortenPipe,
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
