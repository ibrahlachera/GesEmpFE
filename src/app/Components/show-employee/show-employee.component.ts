import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { AdminService } from 'src/app/Serivices/admin.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {
employeeShow: Employee;
  constructor(private activatedRoute:ActivatedRoute, private adminService: AdminService) { }

  ngOnInit(): void {
      let id = this.activatedRoute.snapshot.params.id;
      this.adminService.getOneEmployee(id).subscribe((employee:Employee)=>{
        this.employeeShow = employee;
      })
  }

}
