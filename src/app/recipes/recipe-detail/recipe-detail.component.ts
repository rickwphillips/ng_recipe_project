import { Component, Input } from '@angular/core';
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;

  constructor( private shoppingListSvc: ShoppingListService ) {
  }

  addIngredientsToList() {
    this.shoppingListSvc.addIngredients([...this.recipe.ingredients])
  }

}
