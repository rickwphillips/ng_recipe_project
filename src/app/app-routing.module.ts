import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { Route, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  }, {
    path: 'recipes',
    component: RecipesComponent,
    children: []
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: []
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}