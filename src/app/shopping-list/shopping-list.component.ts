import { Component, OnInit } from '@angular/core';
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListSvc: ShoppingListService) {}
  ngOnInit() {
    this.getIngredients();
    this.shoppingListSvc.ingredientAdded
      .subscribe( () => this.getIngredients())
  }

  getIngredients() {
    this.ingredients = this.shoppingListSvc.getIngredients();
  }

}
