import { Component, OnInit, ViewChild } from '@angular/core';
import { CookbookService } from './cookbook.service';
import { UserService } from '../../common/user/user.service';

@Component({
  selector: 'app-cookbook',
  template: `
    <md-toolbar class="cookbook-toolbar mat-elevation-z6">
    
      <button md-button class="app-toolbar-menu" (click)="toggleSidenav()">
        <i class="material-icons app-toolbar-menu-icon">{{ listOpen ? 'chevron_left' : 'menu' }}</i>
        <span class="recipes-title">Recipes</span>
      </button> 
      
      <span class="app-toolbar-filler"></span>
      
      <button md-mini-fab (click)="newRecipe()">
        <md-icon>note_add</md-icon>
      </button>
     
    </md-toolbar>
    
    <md-sidenav-container class="recipes-container">
    
      <md-sidenav #sidenav class="recipes-sidenav" [opened]="listOpen" mode="side">
        <md-list>
          <md-list-item *ngFor="let recipe of recipeList | async; let i = index" 
                        (click)="showRecipe(recipe)"
                        [ngClass]="recipe.recipeOfCurrentUser ? 'current-user' : ''">             
            <h4 md-line>{{ recipe.title }}</h4>
          </md-list-item>
        </md-list>
      </md-sidenav>
    
      <div class="recipes-sidenav-content">
        <app-recipe-card [recipe]="displayedRecipe" 
                         [recipeOwner]="displayedRecipe ? displayedRecipe.owner : user"
                         [writeProtected]="recipeWriteProtected"
                         (save)="saveRecipe($event)"></app-recipe-card>
      </div>
      
    </md-sidenav-container>    
  `,
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {
  @ViewChild('sidenav') sidenav;
  listOpen = true;
  recipeList;
  displayedRecipe;
  recipeWriteProtected;

  constructor(
    private cookbookService: CookbookService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.recipeList = this.cookbookService.getRecipeList();
  }

  get user() {
    return this.userService.user;
  }

  toggleSidenav() {
    this.listOpen = !this.listOpen;
    this.listOpen ? this.closeSidenav() : this.openSidenav();
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  newRecipe() {
    this.displayedRecipe = null;
    this.recipeWriteProtected = false;
  }

  showRecipe(recipe) {
    return this.cookbookService.getRecipe(recipe)
      .subscribe((recipeDetails) => {
        this.displayedRecipe = recipeDetails;
        this.recipeWriteProtected = !recipe.recipeOfCurrentUser;
      });
  }

  saveRecipe(event) {
    this.cookbookService.saveRecipe(event, this.displayedRecipe)
      .then(savedItem => this.displayedRecipe = savedItem);
  }

}
