import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from "src/app/recipes/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(1, 'Pumpkin Pie',
      'A delicious pumpkin pie',
      'https://www.simplyrecipes.com/thmb/T_J_02rJmbxEPvizYtVlqsIqqSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pumpkin-Pie-Lead-6-335f0cd430ba439fb7449b8abfebe45e.jpg'
      ),
    new Recipe(2, 'Spicy Pumpkin Cream Pie',
      'A delicious and creamy spiced pumpkin pie',
      'https://www.simplyrecipes.com/thmb/T_J_02rJmbxEPvizYtVlqsIqqSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pumpkin-Pie-Lead-6-335f0cd430ba439fb7449b8abfebe45e.jpg'
    ),
  ];

  constructor() {}

  ngOnInit() {

  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
