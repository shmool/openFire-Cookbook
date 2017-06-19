import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { Observable } from 'rxjs';
import { UserService } from '../../common/user/user.service';

@Injectable()
export class CookbookService {
  private currentRecipe;

  constructor(private afDB: AngularFireDatabase, private userService: UserService) {
  }

  getRecipeList() {
    return Observable.combineLatest(
      this.afDB.list(`recipeList`),
      this.userService.userAuthData$)
      .map(results => {
        return results[0].map(recipe => {
          const recipeOfCurrentUser = results[1] && results[1].uid === recipe.uid;
          return Object.assign(recipe, { recipeOfCurrentUser });
        })
      });
  }

  getRecipe(recipe) {
    return Observable.combineLatest(
      this.afDB.object(`/recipes/${recipe.$key}`),
      this.afDB.object(`/users/${recipe.uid}`).first())
      .map(results => {
        return Object.assign(results[0], { owner: results[1] });
      })
      .do(recipe => {
        this.currentRecipe = recipe;
      });
  }

  saveRecipe(recipe, currentRecipe) {
    if (currentRecipe) {
      return this.afDB.object(`/recipes/${currentRecipe.$key || currentRecipe.key}`)
        .set(recipe)
        .then(() => Object.assign(currentRecipe, recipe))
        .catch(error => console.error(error));
    } else {
      return this.afDB.list(`/recipes`)
        .push(recipe)
        .then(savedRecipe => {
          this.currentRecipe = savedRecipe.key;
          return Object.assign(recipe, { $key: savedRecipe.key });
        })
        .catch(error => console.error(error));
    }
  }
}
