import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  recipe: Recipe | undefined;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeSvc: RecipeService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(( params: Params ) => {
      this.id = +params['id'];
      if (!this.id) return;

      this.recipe = this.recipeSvc.getRecipeById(this.id);
      this.editMode = this.recipe !== undefined;
      console.log(this.editMode);
    })

  }
}
