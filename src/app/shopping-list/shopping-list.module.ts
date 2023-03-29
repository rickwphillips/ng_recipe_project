import { NgModule } from '@angular/core';
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }
