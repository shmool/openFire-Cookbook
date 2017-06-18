import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { MaterialModule } from '../common/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [AvatarComponent],
  exports: [AvatarComponent]
})
export class SharedModule { }
