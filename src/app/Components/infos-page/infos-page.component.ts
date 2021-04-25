import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Serivices/admin.service';

@Component({
  selector: 'app-infos-page',
  templateUrl: './infos-page.component.html',
  styleUrls: ['./infos-page.component.css']
})
export class InfosPageComponent implements OnInit {
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }
}
