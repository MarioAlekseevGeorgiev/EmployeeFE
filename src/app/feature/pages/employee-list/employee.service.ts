import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";
import {environment} from "../../../../environments/environment";
import {Paginated} from "../../../auth/util";

@Injectable({providedIn: 'root'})
export class EmployeeService {
private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees$(user_id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all/${user_id}`);
  }

  public addEmployees$(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployees$(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployees$(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

  public getEmployeesBySearch$(searchTerm: string, userId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/search`, {
      params: new HttpParams({
        fromObject: {
          searchTerm: searchTerm,
          userId: userId
        }
      })
    });

  }

  public getEmployeesSearchPageable$(userId: number, name: string, email: string, phone: string, jobTitle: string, pageSize: number, pageNumber: number): Observable<Paginated<Employee>> {
    return this.http.get<Paginated<Employee>>(`${this.apiServerUrl}/employee/searchPageable`, {
      params: new HttpParams({
        fromObject: {
          userId:     userId,
          name:       name,
          email:      email,
          phone:      phone,
          jobTitle:   jobTitle,
          pageSize:   pageSize,
          pageNumber: pageNumber
        }
      })
    });

  }

}
