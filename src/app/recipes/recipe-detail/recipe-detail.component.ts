import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  recipe: Recipe | undefined;
  id: number | undefined;
  recipesChangedSub: Subscription | undefined;
  constructor(
    private recipeSvc: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.setRecipe(this.recipeSvc.getRecipe(this.id));
    this.route.params
      .subscribe( (params: Params) => {
        this.id = +params['id'];
        this.setRecipe(this.recipeSvc.getRecipe(this.id));
      })
    this.recipesChangedSub = this.recipeSvc.recipesChanged.subscribe( () => {
      this.setRecipe(this.recipeSvc.getRecipe(this.id!));
    })
  }

  setRecipe( recipe: Recipe | undefined ) {
    if (!recipe) return this.router.navigate(['recipes'])

    return this.recipe = recipe;
  }

  onDeleteRecipe() {
    if(window.confirm("Are you sure you want to delete this recipe?")) {
      this.recipeSvc.deleteRecipe(this.id!);
      this.router.navigate(['recipes']).then();
    }
  }

  addIngredientsToList() {
    this.recipeSvc.addIngredientsToShoppingList([...this.recipe!.ingredients]);
  }

  ngOnDestroy(): void {
    this.recipesChangedSub?.unsubscribe();
  }

}
