import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableListComponent } from './employee-table-list.component';

describe('EmployeeTableListComponent', () => {
  let component: EmployeeTableListComponent;
  let fixture: ComponentFixture<EmployeeTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
