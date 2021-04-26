import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Employee } from 'src/app/Models/employee';
import { Holiday } from 'src/app/Models/holiday';
import { AdminService } from 'src/app/Serivices/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
employeesList : Employee[] = [];

form: FormGroup;
editForm: FormGroup;
addholiday: FormGroup;
id:string;
employee:Employee;
employeeShow:Employee;
editDate: FormGroup;
@ViewChild('closebutton') closebutton;
@ViewChild('closebuttonedit') closebuttonedit;
@ViewChild('closebuttondate') closebuttondate;
@ViewChild('closebuttonholiday') closebuttonholiday;
@Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listOfEmployees();
    this.form = new FormGroup({
      first_name: new FormControl(null, {validators: [Validators.required]}),
      last_name: new FormControl(null, {validators: [Validators.required]}),
      cin: new FormControl(null, {validators: [Validators.required]}),
      tel: new FormControl(null, {validators: [Validators.required,
        Validators.maxLength(10)]}),
      picture: new FormControl(null, {validators: [Validators.required]}),
      cnss: new FormControl(null, {validators: [Validators.required]}),
        age: new FormControl(null, {validators: [Validators.required,
          Validators.maxLength(2)]}),
          birth_place: new FormControl(null, {validators: [Validators.required]}),
      adrress: new FormControl(null, {validators: [Validators.required]})})


      this.editForm = new FormGroup({
        first_name: new FormControl(null, {validators: [Validators.required]}),
        last_name: new FormControl(null, {validators: [Validators.required]}),
        cin: new FormControl(null, {validators: [Validators.required]}),
        tel: new FormControl(null, {validators: [Validators.required,
          Validators.maxLength(10)]}),
        picture: new FormControl(null, {validators: [Validators.required]}),
        cnss: new FormControl(null, {validators: [Validators.required]}),
          age: new FormControl(null, {validators: [Validators.required,
            Validators.maxLength(2)]}),
            birth_place: new FormControl(null, {validators: [Validators.required]}),
        adrress: new FormControl(null, {validators: [Validators.required]})})

        this.editDate = new FormGroup({
          out_date: new FormControl(null, {validators: [Validators.required]})})

          this.addholiday = new FormGroup({
            begin_date: new FormControl(null, {validators: [Validators.required]}),
            end_date: new FormControl(null, {validators: [Validators.required]}),
            type_holiday: new FormControl(null, {validators: [Validators.required]})
          })
     
            
  }

  listOfEmployees(){
      this.adminService.getAllEmployees().subscribe((employees:Employee[])=>{
        this.employeesList = employees;
        this.employeesList.forEach((employee:Employee)=>{
          if(employee.hire_date != null){
             let hiredate = moment(employee.hire_date);
          let now = moment(new Date());
          let result = now.diff(hiredate,'months');
          let soldeCalcul = result*1.5;
          let sold = {holiday_sold : String(soldeCalcul)}
          this.adminService.editSoldeEmployee(employee._id,sold).subscribe((ok)=>console.log("Solde modifié"))
          }else{
            let sold = {holiday_sold : String(0)}
            this.adminService.editSoldeEmployee(employee._id,sold).subscribe((ok)=>console.log("Solde modifié"))
          }
         
        })
      })
  }



  addOneEmployee(){
    if(this.form.valid){
      this.adminService.addEmployee(this.form.value).subscribe(()=>{
        this.closebutton.nativeElement.click();
        this.listOfEmployees();
      })
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ picture: file });
    this.form.get("picture").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  onImagePickedEdit(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ picture: file });
    this.editForm.get("picture").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  buttonClicked(id){
    this.id = id;
    this.addholiday.setValue({
      begin_date: '',
      end_date: '',
      type_holiday:''
    })
    this.adminService.getOneEmployee(this.id).subscribe((employee:Employee)=>{
      this.employee = employee;
      this.editForm = new FormGroup({
        first_name: new FormControl(this.employee.first_name, {validators: [Validators.required]}),
        last_name: new FormControl(this.employee.last_name, {validators: [Validators.required]}),
        cin: new FormControl(this.employee.cin, {validators: [Validators.required]}),
        tel: new FormControl(this.employee.tel, {validators: [Validators.required,
          Validators.maxLength(10)]}),
        picture: new FormControl(this.employee.picture, {validators: [Validators.required]}),
        cnss: new FormControl(this.employee.cnss, {validators: [Validators.required]}),
          age: new FormControl(this.employee.age, {validators: [Validators.required,
            Validators.maxLength(2)]}),
            birth_place: new FormControl(this.employee.birth_place, {validators: [Validators.required]}),
        adrress: new FormControl(this.employee.adrress, {validators: [Validators.required]})})
    })
  }

  editOneEmployee(){
    if(this.editForm.valid){
      this.adminService.editOneEmployee(this.employee._id,this.editForm.value).subscribe(()=>{
        this.closebuttonedit.nativeElement.click();
        this.listOfEmployees();
      })
    }
  }
  editOutDateEmployee(){
    if(this.editDate.valid){
      this.adminService.editOutDateEmployee(this.employee._id,this.editDate.value).subscribe(()=>{
        this.closebuttondate.nativeElement.click();
        this.listOfEmployees();
      })
    }
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
        this.adminService.deleteEmployee(id).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.listOfEmployees();
        })
      
      }
    })
   
  }

  addHoliday(){
    if(this.addholiday.valid){
      this.adminService.addHolidayToEmployee(this.addholiday.value,this.employee._id).subscribe(()=>{
        if(this.addholiday.value.type_holiday == 'PAYE'){
      var dateBegin = moment(this.addholiday.value.begin_date);
            var dateEnd = moment(this.addholiday.value.end_date);
            var result = { holiday_consum :dateEnd.diff(dateBegin,'days')+1};
            this.adminService.editConsumEmployee(this.employee._id,result).subscribe(()=>console.log("consommation modifié"))
        }
     
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Congé Ajouté',
          showConfirmButton: false,
          timer: 1500
        })
        this.closebuttonholiday.nativeElement.click();
        this.listOfEmployees();
      })
    } 
  }
 
}

