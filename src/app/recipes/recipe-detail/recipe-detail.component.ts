import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe | undefined;
  id: number | undefined;
  constructor(
    private recipeSvc: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) {}
  ngOnInit() {
    const recipeId = +this.route.snapshot.params['id'];
    this.setRecipe(this.recipeSvc.getRecipe(recipeId));
    this.route.params
      .subscribe( (params: Params) => {
        this.setRecipe(this.recipeSvc.getRecipe(+params['id']));
      })

  }

  setRecipe( recipe: Recipe | undefined ) {
    if (!recipe) return this.router.navigate(['recipes'])

    return this.recipe = recipe;
  }



  addIngredientsToList() {
    this.recipeSvc.addIngredientsToShoppingList([...this.recipe!.ingredients])
  }

}
