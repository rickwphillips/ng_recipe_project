import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] | undefined;
  sub!: Subscription;
  searchString = '';

  constructor(private recipeSvc: RecipeService) {}

  ngOnInit() {
    this.sub = this.recipeSvc.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
      })
    this.recipes = this.recipeSvc.getRecipes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
