import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(1, 'Pumpkin Pie',
      'A delicious pumpkin pie',
      'https://www.simplyrecipes.com/thmb/T_J_02rJmbxEPvizYtVlqsIqqSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pumpkin-Pie-Lead-6-335f0cd430ba439fb7449b8abfebe45e.jpg'
    ),
    new Recipe(2, 'Spicy Pumpkin Cream Pie',
      'A delicious and creamy spiced pumpkin pie',
      'https://www.simplyrecipes.com/thmb/T_J_02rJmbxEPvizYtVlqsIqqSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pumpkin-Pie-Lead-6-335f0cd430ba439fb7449b8abfebe45e.jpg'
    ),
  ];
  constructor() { }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
