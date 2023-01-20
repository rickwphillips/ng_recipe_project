import { Component, OnInit } from '@angular/core';
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    new Ingredient('Sugar', 4, 'cups'),
    new Ingredient('Pie Crust', 1, 'package'),
    new Ingredient('Pumpkin', 1, 'whole')
  ];

  constructor() {
  }
  ngOnInit() {
  }
}
