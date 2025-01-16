import { RouterModule, Routes } from '@angular/router';
import { ListRequestComponent } from './RequestEC/Forms/list-request/list-request.component';
import { RequestUploadListComponent } from './RequestEC/Forms/request-upload-list/request-upload-list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'RequestList', component: ListRequestComponent },
  { path: 'RequestCU/:param1', component: RequestUploadListComponent },
  { path: '', redirectTo: '/RequestList', pathMatch: 'full' }
];
