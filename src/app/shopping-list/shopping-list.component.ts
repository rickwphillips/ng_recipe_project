import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, windowWhen } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private sub!: Subscription;

  constructor(private shoppingListSvc: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListSvc.getIngredients();
    this.sub = this.shoppingListSvc.ingredientsChanged
      .subscribe( (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onEditItem( index: number ) {
    this.shoppingListSvc.startedEditing.next(index);
  }
}
