import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Milk', '1', 'Cup')
  ];


  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredient( ingredient: Ingredient ) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients])
  }

  addIngredients( ingredients: Array<Ingredient> ) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientsChanged.next([...this.ingredients])
  }

  updateIngredient( index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  getIngredient( index: number ): Ingredient {
    return this.ingredients[index];
  }

  deleteIngredient( index: number ) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next([...this.ingredients])
  }
}
