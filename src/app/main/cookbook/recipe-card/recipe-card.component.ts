import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnChanges {
  @Input() recipe;
  @Input() recipeOwner;
  @Input() writeProtected = false;
  @Output() save: EventEmitter<any> = new EventEmitter();
  read = false;
  recipeForm;

  constructor(private formBuilder: FormBuilder) {
    this.resetForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.resetForm();
    if (this.recipe) {
      const ingredientFGs = this.recipe.ingredients.map(
        ingredient => this.createIngredient(ingredient));

      this.recipeForm.controls.ingredients =
        this.formBuilder.array(ingredientFGs);

      this.read = true;
      this.recipeForm.patchValue(this.recipe);
    } else {
      this.handleEdit();
    }
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  };

  resetForm() {
    this.recipeForm = this.formBuilder.group({
      title: '',
      type: '',
      ingredients: this.formBuilder.array([this.createIngredient()]),
      instructions: ''
    })
  }

  createIngredient(item = { name: '', quantity: '' }) {
    return this.formBuilder.group(item)
  }

  addIngredient(event) {
    event.preventDefault();
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  handleEdit() {
    if (!this.writeProtected) {
      this.read = false;
    }
  }

  handleSave() {
    this.save.emit(this._getDataFromForm());
  }

  _getDataFromForm() {
    const formModel = this.recipeForm.value;

    const ingredientsDeepCopy = this.ingredients.map(
      (ingredient) => Object.assign({}, ingredient.value)
    );

    const recipe = formModel;
    recipe.ingredients = ingredientsDeepCopy;
    return recipe;
  }

  getPlaceholder(placeholder) {
    if (!this.read) return placeholder;
  }

}