import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee-list/employee.service";
import {Paginated} from "../../../auth/util";
import {Employee} from "../employee-list/employee";
import {NgForm} from "@angular/forms";
import {MessageBusService, MessageType} from "../../../core/message/message-bus.service";
import {IUser} from "../../../core/interfaces/user";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-employee-table-list',
  templateUrl: './employee-table-list.component.html',
  styleUrls: ['./employee-table-list.component.css']
})
export class EmployeeTableListComponent implements OnInit {

  @ViewChild('searchForm') searchForm?: NgForm;

  currentUser!: IUser;

  constructor(private employeeService: EmployeeService, private messageBus: MessageBusService, private authService: AuthService) { }

   paginatedEmployees?: Paginated<Employee>;
   employees?: Employee[];

   pagesize: number = 3;
   currentPage: number = 0;
   totalResults: number = 0;

   name: string = '';
   email: string = '';
   phone: string = '';
   jobTitle: string = '';

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  goOnePageBck() {
     this.currentPage--;
    this.  getEmployeesSearchPageableFirstSearchCriteria();
  }

  goOnePageForward() {
    this.currentPage++;
    this.  getEmployeesSearchPageableFirstSearchCriteria();
  }

  getTotalPages(): number {
    return Math.round(this.totalResults / this.pagesize);
  }

  getEmployeesSearchPageable() {

    this.employees = undefined;

    const {name, email, phone, jobTitle} = this.searchForm?.value;

    this.name     = name;
    this.email    = email;
    this.phone    = phone;
    this.jobTitle = jobTitle;

    this.employeeService.getEmployeesSearchPageable$(this.currentUser.id, name, email, phone, jobTitle, this.pagesize, this.currentPage).subscribe({
      next: value => {
        this.paginatedEmployees = value;
        if (this.paginatedEmployees.result.length !== 0) {
          this.employees = this.paginatedEmployees.result;
        } else {
          this.showNoResultMessage();
        }
        this.totalResults = this.paginatedEmployees.totalResults;
        console.log(this.paginatedEmployees);
      }
    })
  }

  showNoResultMessage() {
    this.messageBus.notifyMessage({
      text: 'No results',
      type: MessageType.Success
    });
  }

  getEmployeesSearchPageableFirstSearchCriteria() {

    this.employeeService.getEmployeesSearchPageable$(1, this.name, this.email, this.phone, this.jobTitle, this.pagesize, this.currentPage).subscribe({
      next: value => {
        this.paginatedEmployees = value;
        this.employees = this.paginatedEmployees.result;
        this.totalResults = this.paginatedEmployees.totalResults;
        console.log(this.paginatedEmployees);
      }
    })
  }

  search() {
    this.getEmployeesSearchPageable();
  }

}
