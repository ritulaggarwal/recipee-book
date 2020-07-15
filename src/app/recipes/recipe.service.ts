import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged= new Subject<Recipe[]>();
    /*private recipes: Recipe[]=[
        new Recipe('Test', 'A test ', '#',[
          new Ingredient('Bread', 5),
          new Ingredient('Buns',10)
        ])
      ]; */
      recipes: Recipe[]=[];   
      constructor(private slService: ShoppingListService){}

      getRecipes(){
         return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];
      }
      setRecipes(recipes: Recipe[]){
        this.recipes= recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index: number, recipe: Recipe){
        this.recipes[index]= recipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}