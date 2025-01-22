import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './MainScreen/form-login/form-login.component';
import { FormLogoutComponent } from './MainScreen/form-logout/form-logout.component';
import { FormUserLoginComponent } from './MainScreen/form-user-login/form-user-login.component';
import { HeaderCompComponent } from './MainScreen/header-comp/header-comp.component';
import { RegistrationComponent } from "./MainScreen/Forms/registration/registration.component";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestUploadListComponent } from './RequestEC/Forms/request-upload-list/request-upload-list.component';
import { ListRequestComponent } from './RequestEC/Forms/list-request/list-request.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';
import { ReqUpdateListComponent } from './RequestEC/Forms/req-update-list/req-update-list.component';
import { HeaderSearchbarComponent } from "./MainPage/Components/header-searchbar/header-searchbar.component";
import { ProductsProductTypesComponent } from "./MainPage/Components/products-product-types/products-product-types.component";

const ROUTES: Routes = [ 
  { path: 'RequestList', component: ListRequestComponent },
  { path: 'RequestUpdList/:param1/:param2', component: ReqUpdateListComponent },
  { path: 'RequestCU/:param1/:param2/:param3', component: RequestUploadListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderCompComponent,
  ],
  imports: [
    BrowserModule, FormLoginComponent,
    FormLogoutComponent, FormUserLoginComponent,
    RegistrationComponent, HttpClientModule, BrowserAnimationsModule,
    RequestUploadListComponent, ListRequestComponent, RouterModule.forRoot(ROUTES),
    HeaderSearchbarComponent,
    ProductsProductTypesComponent
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
