import { Recipe } from '../recipe-list/recipe.model';
import * as RecipesActions from './recipe.actions';
import { act } from '@ngrx/effects';


export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action = RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        default:
            return state;
    }
}