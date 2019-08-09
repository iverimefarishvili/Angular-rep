import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService { 
    recipeSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('test recipe','test','https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn', [ new Ingredient('banana', 1)]),
        new Recipe('test recipe22','test22','https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn', [ new Ingredient('meat', 1) ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        
        return this.recipes.slice();
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
    
}