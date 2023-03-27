import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

const RECIPE_API = 'https://ricks-recipes-angular-default-rtdb.firebaseio.com/recipes.json';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor( private http: HttpClient, private recipeSvc: RecipeService ) {
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(RECIPE_API)
      .pipe(
        map( (recipes: Recipe[]) => {
          return recipes.map( (recipe => {
            return {...recipe, ingredients: recipe?.ingredients ?? [] }
          }))
        }),
        tap( recipes => this.recipeSvc.setRecipes(recipes))
      );
  }

  storeRecipes() {
    const recipes = this.recipeSvc.getRecipes();
    this.http.put(RECIPE_API, recipes).subscribe(res => {
      console.log(res)
    });
  }
}
