import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  currentId: number | undefined;


  private recipes: Recipe[] = [];
  constructor( private slServer: ShoppingListService ) {
    this.setNextRecipeId(false);
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  setRecipes( recipes: Recipe[] ) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  getRecipe( id: number ): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addIngredientsToShoppingList( ingredients: Ingredient[] ) {
    this.slServer.addIngredients(ingredients);
  }

  addRecipe( recipe: Recipe ) {
    recipe.id = this.setNextRecipeId();
    this.recipes = [...this.recipes, recipe];
    this.recipesChanged.next([...this.recipes]);

    return +recipe.id;
  }

  setNextRecipeId( increment = true ) {
    if (!this.currentId) {
      this.currentId = 0;
      this.recipes.forEach(r => {
        if (+r.id > this.currentId!) {
          this.currentId = r.id;
        }
      })
    }

    return increment ? ++this.currentId : this.currentId;
  }

  updateRecipe( id: number, recipe: Recipe ) {
    this.recipes = this.recipes.map(r => {
      return +r.id !== id ? r : recipe;
    })
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe( id: number ) {
    this.recipes = this.recipes.filter(r => +r.id !== id);
    this.recipesChanged.next([...this.recipes]);
  }
}
