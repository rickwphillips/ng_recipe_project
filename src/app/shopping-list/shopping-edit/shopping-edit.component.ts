import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  private subs!: Subscription;
  editMode = false;
  editItemIndex: number | undefined;
  editedItem: Ingredient | undefined;

  constructor( private shoppingListSvc: ShoppingListService ) {
  }

  ngOnInit() {
    this.subs = this.shoppingListSvc.startedEditing
      .subscribe(( index: number ) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListSvc.getIngredient(index);
        this.slForm.setValue({ ...this.editedItem })
      })
  }

  onSubmit( form: NgForm ) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount, value.unit);

    if (this.editMode) {
      this.shoppingListSvc.updateIngredient(this.editItemIndex!, ingredient);
    } else {
      this.shoppingListSvc.addIngredient(ingredient);
    }

    this.onClear();
  }

  onClear( ) {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListSvc.deleteIngredient(this.editItemIndex!);
    this.onClear()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
