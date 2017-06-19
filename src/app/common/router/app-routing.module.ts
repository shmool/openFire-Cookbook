import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingService } from './routing.service';
import { MainComponent } from '../../main/main.component';
import { SignInComponent } from '../../main/sign-in/sign-in.component';
import { CookbookComponent } from '../../main/cookbook/cookbook.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: CookbookComponent},
      {path: 'sign-in', component: SignInComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true}*/)],
  exports: [RouterModule],
  providers: [RoutingService]
})
export class AppRoutingModule { }
