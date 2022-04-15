import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {FormControl, NgForm} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {IUser} from "../../../core/interfaces/user";
import {debounceTime, map, mergeMap, startWith, take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees?: Employee[];
  public editEmployee?: Employee;
  public deleteEmployee? : Employee;

  // private subscription: Subscription = new Subscription();
  currentUser!: IUser;

  constructor(private employeeService: EmployeeService, private authService: AuthService, private router: Router) {}

  searchControl = new FormControl();

  ngOnInit() {
      this.authService.currentUser$.subscribe(currentUser => {
        this.currentUser = currentUser;
      });

      if (this.currentUser) {
        this.getEmployees(this.currentUser.id);

        this.searchControl.valueChanges.pipe(
          startWith(''),
          debounceTime(1000),
          mergeMap(searchTerm => this.employeeService.getEmployeesBySearch$(searchTerm, this.currentUser.id)))
          .subscribe(respnse => {
            this.employees = respnse;
          });
      }
  }

  public getEmployees(user_id: number): void {
    this.employeeService.getEmployees$(user_id).subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: err => {
        alert(err.message);
      }
    });
  }

  public onOpenModal(employee: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      if (employee !== null) {
        this.editEmployee = employee;
      }
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      if (employee !== null) {
        this.deleteEmployee = employee;
      }
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (container !== null) {
      container.appendChild(button);
    }
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    const buttonClose = document.getElementById('add-employee-form');
    if (buttonClose !== null) {
      buttonClose.click();
    }

    const { name, email, phone, jobTitle, imageUrl } = addForm.value;

    const employee: Employee = {
      id: undefined,
      name: name,
      email: email,
      phone: phone,
      jobTitle: jobTitle,
      imageUrl: imageUrl,
      employeeCode: '',
      userId: this.currentUser.id
    }

    this.employeeService.addEmployees$(employee).subscribe({
      next: () => {
        this.getEmployees(this.currentUser.id);
        addForm.reset();
      },
      error: err => {
        alert(err.message);
        addForm.reset();
      }
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    const buttonClose = document.getElementById('update-employee-form');
    if (buttonClose !== null) {
      buttonClose.click();
    }
    employee.userId = this.currentUser.id;
    this.employeeService.updateEmployees$(employee).subscribe({
      next: () => {
        this.getEmployees(this.currentUser.id);
      },
      error: err => {alert(err.message)}
    });
  }

  public onDeleteEmployee(employeeId: any): void {
    this.employeeService.deleteEmployees$(employeeId).subscribe({
      next: () => {
        this.getEmployees(this.currentUser.id);
      },
      error: err => {
        alert(err.message)
      },
    });
  }

  // public searchEmployees(key: string): void {
  //   const results: Employee[] = [];
  //   if (this.employees !== null && this.employees !== undefined) {
  //     for (const employee of this.employees) {
  //       if (employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
  //         || employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
  //         || employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
  //         || employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
  //         results.push(employee);
  //       }
  //     }
  //   }
  //   this.employees = results;
  //   if (results.length === 0 || !key) {
  //     this.getEmployees(this.currentUser.id);
  //   }
  // }
}
