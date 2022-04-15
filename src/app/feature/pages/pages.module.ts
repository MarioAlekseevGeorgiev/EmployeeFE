import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import { EmployeeTableListComponent } from './employee-table-list/employee-table-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    EmployeeListComponent,
    EmployeeTableListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
