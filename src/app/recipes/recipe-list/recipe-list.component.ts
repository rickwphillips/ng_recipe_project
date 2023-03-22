import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] | undefined;
  sub!: Subscription;

  constructor(private recipeSvc: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.recipeSvc.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
      })
    this.recipes = this.recipeSvc.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route}).then();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
