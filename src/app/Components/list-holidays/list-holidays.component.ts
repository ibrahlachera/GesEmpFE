import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Employee } from 'src/app/Models/employee';
import { Holiday } from 'src/app/Models/holiday';
import { AdminService } from 'src/app/Serivices/admin.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.css']
})
export class ListHolidaysComponent implements OnInit {
holidays : Holiday[]= [];
id:string;
holidayedit:Holiday;
holidayshow:Holiday;
editholiday: FormGroup;
id_hol:string;
@ViewChild('closebuttonholidayedit') closebuttonholidayedit;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.listOfHolidays();
    this.editholiday = new FormGroup({
      begin_date: new FormControl(null, {validators: [Validators.required]}),
      end_date: new FormControl(null, {validators: [Validators.required]}),
      type_holiday: new FormControl(null, {validators: [Validators.required]})
    })
  }

  listOfHolidays(){
    this.adminService.getAllHolidays().subscribe((holidays:Holiday[])=>{
      this.holidays = holidays;
    })
  }

  buttonClicked(id){
    this.id = id;
    this.adminService.getOneHoliday(this.id).subscribe((holiday:Holiday)=>{
      this.holidayedit = holiday;
      this.editholiday = new FormGroup({
        begin_date: new FormControl(this.holidayedit.begin_date, {validators: [Validators.required]}),
        end_date: new FormControl(this.holidayedit.end_date, {validators: [Validators.required]}),
        type_holiday: new FormControl(this.holidayedit.type_holiday, {validators: [Validators.required]})
      })
    })
  }

  changeDate(){
    let nbrjr = moment(this.holidayedit.end_date).diff(moment(this.holidayedit.begin_date),'days')
    let dateBegin = moment(this.editholiday.get('begin_date').value);
    let dateEnd = dateBegin.add(nbrjr,'days').format('YYYY-MM-DD');
    this.editholiday.get('end_date').setValue(dateEnd)
  }

  editHoliday(){
      if(this.editholiday.valid){
        this.adminService.editHolidayToEmployee(this.editholiday.value,this.holidayedit.employee._id,this.holidayedit._id).subscribe(()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Congé Modifié',
            showConfirmButton: false,
            timer: 1500
          })
          this.closebuttonholidayedit.nativeElement.click();
          this.listOfHolidays();
        })
      }
  }
  buttonClickedShow(id){
    this.id_hol = id;
    this.adminService.getOneHoliday(this.id).subscribe((holiday:Holiday)=>{
      this.holidayshow = holiday;
    })
  }
  deleteEmployee(id){
  
    Swal.fire({
      title: 'Etes-vous sur de le supprimer',
      text: "Vous ne pouvez pas le récuprer si vous confirmez",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.getOneHoliday(id).subscribe((holiday:Holiday)=>{
          if(holiday.type_holiday == "PAYE"){
             let nbrjr = moment(holiday.end_date).diff(holiday.begin_date,'days')+1;
          
          this.adminService.getOneEmployee(holiday.employee._id).subscribe((employee:Employee)=>{
            let newconsom = {holiday_consum: -nbrjr}

           this.adminService.editConsumEmployee(holiday.employee._id, newconsom).subscribe(()=>console.log('Consomation modifié'));
          })
          }
        })
        this.adminService.deleteHoliday(id).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.listOfHolidays();
        })
      
      }
    })
   
  }
}
