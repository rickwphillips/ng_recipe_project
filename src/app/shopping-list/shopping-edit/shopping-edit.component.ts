import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput') amountInputRef: ElementRef | undefined;
  @ViewChild('unitInput') unitInputRef: ElementRef | undefined;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListSvc: ShoppingListService) {}
  onAddItem() {

    this.shoppingListSvc.addIngredient({
      name: this.nameInputRef?.nativeElement.value,
      amount: this.amountInputRef?.nativeElement.value,
      unit: this.unitInputRef?.nativeElement.value
    })
  }
}
