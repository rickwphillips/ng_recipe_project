import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] | undefined;

  constructor(private recipeSvc: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeSvc.getRecipes();
  }

}
