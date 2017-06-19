import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookbookComponent } from './cookbook.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookbookService } from './cookbook.service';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../common/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    CookbookComponent,
    RecipeCardComponent
  ],
  exports: [
    CookbookComponent
  ],
  providers: [
    CookbookService
  ]
})
export class CookbookModule { }
