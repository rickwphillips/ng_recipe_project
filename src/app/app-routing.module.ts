import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { Route, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolver } from "./recipes/recipes.resolver";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  }, {
    path: 'recipes',
    component: RecipesComponent,
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
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: []
  },
  {
    path: 'auth',
    component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}