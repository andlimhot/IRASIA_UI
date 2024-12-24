import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './MainScreen/form-login/form-login.component';
import { FormLogoutComponent } from './MainScreen/form-logout/form-logout.component';
import { FormUserLoginComponent } from './MainScreen/form-user-login/form-user-login.component';
import { HeaderCompComponent } from './MainScreen/header-comp/header-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderCompComponent,   
  ],
  imports: [
    BrowserModule, FormLoginComponent,
    FormLogoutComponent, FormUserLoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
