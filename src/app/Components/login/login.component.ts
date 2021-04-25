import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Models/admin';
import { AdminService } from 'src/app/Serivices/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
admin:Admin= {
  login:"",
  password:""
}
  constructor(private router: Router,private adminService:AdminService) { }

  ngOnInit(): void {
    if(this.adminService.getToken()){
      this.router.navigate(['/home'])
    }
  }
  loginApp() {
    this.adminService.getLogin(this.admin).subscribe((res: any) => {
     if(res.status) {
       this.adminService.setAuthStatusListener(true);
       localStorage.setItem('token', res.token);
       this.router.navigate(['/']);
  
      } 

   })
    

  }
}
