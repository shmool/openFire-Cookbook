import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSlideToggleModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdListModule,
  MdSidenavModule
} from '@angular/material';

const mdModules = [
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSlideToggleModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdListModule,
  MdSidenavModule
];

@NgModule({
  imports: [
    CommonModule,
    ...mdModules
  ],
  exports: [
    ...mdModules
  ],
  declarations: []
})
export class MaterialModule {
}
