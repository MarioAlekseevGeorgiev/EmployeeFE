import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeTableListComponent} from "./employee-table-list/employee-table-list.component";

const route: Routes = [
  {
    path: 'employee',
    canActivate: [AuthGuard],
    component: EmployeeListComponent
  },
  {
    path: 'employeeTable',
    canActivate: [AuthGuard],
    component: EmployeeTableListComponent
  }
]

export const PagesRoutingModule = RouterModule.forChild(route);
