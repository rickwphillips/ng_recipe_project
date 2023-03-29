import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolver } from "./recipes.resolver";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipeStartComponent,
        resolve: [RecipesResolver]
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolver]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolver]
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}