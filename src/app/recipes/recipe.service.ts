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
  private recipes: Recipe[] = [
    new Recipe(1, 'Pumpkin Pie',
      'A delicious and creamy spiced pumpkin pie',
      'https://www.simplyrecipes.com/thmb/T_J_02rJmbxEPvizYtVlqsIqqSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pumpkin-Pie-Lead-6-335f0cd430ba439fb7449b8abfebe45e.jpg',
      [
        new Ingredient('Pie Crust', 1, 'Whole'),
        new Ingredient('Pumpkin Filling', 1, 'Can'),
        new Ingredient('Cool Whip', 16, 'Ounce'),
        new Ingredient('Brown Sugar', 2, 'Tea Spoon'),
        new Ingredient('Cinnamon', 1, 'Table Spoon')
      ]
    ),
    new Recipe(2, 'Spicy Quarter Pound Burger',
      'A delicious and spicy all American burger',
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
      [
        new Ingredient('Bun', 1, 'Whole'),
        new Ingredient('Ground Beef', 1, 'Patty'),
        new Ingredient('Lettuce', 1, 'Slice'),
        new Ingredient('Tomato', 2, 'Slice'),
        new Ingredient('Cheese', 1, 'Slice')
      ]
    ),
  ];

  constructor( private slServer: ShoppingListService ) {
  }

  getRecipes(): Recipe[] {
    debugger
    return [...this.recipes];
  }

  getRecipe( id: number ): Recipe | undefined {
    return this.recipes[--id];
  }

  addIngredientsToShoppingList( ingredients: Ingredient[] ) {
    this.slServer.addIngredients(ingredients);
  }

  addRecipe( recipe: Recipe ) {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
    return this.recipes.length;
  }

  updateRecipe( id: number, recipe: Recipe ) {
    this.recipes[--id] = recipe;
    this.recipesChanged.next([...this.recipes]);
  }
}
