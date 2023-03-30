import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  recipe: Recipe | undefined;
  editMode = false;
  recipeForm!: FormGroup;
  recipesChangedSub: Subscription | undefined;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private recipeSvc: RecipeService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(( params: Params ) => {
      this.id = +params['id'];
      if (!isNaN(this.id)) {
        this.recipe = this.recipeSvc.getRecipe(this.id);
        if (this.recipe === undefined) {
          this.router.navigate(['recipes','new']).then();
        } else {
          this.editMode = true;
        }
      } else {
        this.editMode = false;
      }
      this.initForm();
    })

    this.recipesChangedSub = this.recipeSvc.recipesChanged.subscribe( () => {
      this.router.navigate(['../'], {relativeTo: this.route}).then()
    })

  }

  initForm() {
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.recipe?.ingredients.length) {
      this.recipe.ingredients.forEach(i => {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(i.name, Validators.required),
            'amount': new FormControl(i.amount, Validators.required),
            'unit': new FormControl(i.unit, Validators.required)
          })
        )
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe?.name ?? '', Validators.required),
      'imagePath': new FormControl(this.recipe?.imagePath ?? '', Validators.required),
      'description': new FormControl(this.recipe?.description ?? '', Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required),
        'unit': new FormControl(null, Validators.required),
      })
    )
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.id ?? 0,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      this.recipeSvc.updateRecipe(newRecipe.id, newRecipe);
    } else {
      this.id = this.recipeSvc.addRecipe(newRecipe);
    }

    this.router.navigate(['recipes', this.id]).then();
  }

  onCancel() {
    const id = this.editMode ? this.id : '';
    this.router.navigate(['recipes', id]).then();
  }

  onDeleteIngredient( index: number ) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.recipeForm.markAsDirty();
  }

  onClearIngredients() {
    if (window.confirm("Are you sure?")) {
      (<FormArray>this.recipeForm.get('ingredients')).clear();
      this.recipeForm.markAsDirty();
    }
  }
}
