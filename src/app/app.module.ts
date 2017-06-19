import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './common/material/material.module';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './common/router/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './common/user/user.module';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './main/header/header.component';
import { UserStatusComponent } from './main/header/user-status/user-status.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth/auth.module';
import { AngularFireDatabaseModule } from 'angularfire2/database/database.module';
import { CookbookModule } from './main/cookbook/cookbook.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    HeaderComponent,
    UserStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CookbookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
