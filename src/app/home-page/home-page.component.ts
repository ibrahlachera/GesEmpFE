import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Serivices/admin.service';
import jwt_decode from "jwt-decode";
import { Admin } from '../Models/admin';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
admin:Admin;
adminAutenticated: boolean = false;
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.adminAutenticated = this.adminService.getToken();
    this.adminService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.adminAutenticated = isAuthenticated;
      });
      console.log(this.router.url);
    
    let tokencode:any = jwt_decode(localStorage.getItem('token'));
   this.adminService.getAdminConnected(tokencode.id).subscribe((admin:Admin)=>{
     this.admin=admin;
   })
  }


  logout() {
    this.adminService.removeToken();
    this.adminAutenticated = false;
    this.router.navigate(['/login']);
 }
}
