import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientAdded = new EventEmitter<void>();

  private ingredients = [
    new Ingredient('Sugar', 4, 'cups'),
    new Ingredient('Pie Crust', 1, 'package'),
    new Ingredient('Pumpkin', 1, 'whole')
  ];


  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredient( ingredient: Ingredient ) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit();
  }
}
