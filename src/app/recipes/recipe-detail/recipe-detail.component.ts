import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { 

              
  }

  ngOnInit() {
      const id = this.route.snapshot.params['id'];
  }
  
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
