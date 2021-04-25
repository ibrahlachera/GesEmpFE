import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Admin } from '../Models/admin';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
url = 'http://localhost:3000/api/app';
token: string = "";
admin : Admin ={
  login:"",
  password:""
}
private authStatusListener = new Subject<boolean>();
  constructor(private httpCLient:HttpClient) { }

  getAllEmployees(){
    return this.httpCLient.get(`${this.url}/allEmployees`);
  }

  addEmployee(employee:Employee){
    const employeeData = new FormData();
    employeeData.append("first_name",employee.first_name);
    employeeData.append("last_name",employee.last_name);
    employeeData.append("cin",employee.cin);
    employeeData.append("tel",employee.tel);
    employeeData.append("picture",employee.picture);
    employeeData.append("cnss",employee.cnss);
    employeeData.append("adrress",employee.adrress);
    employeeData.append("age",String(employee.age));
    employeeData.append("birth_place",employee.birth_place);
    return this.httpCLient.post(`${this.url}/addEmployee`,employeeData);
  }

  getOneEmployee(id){
    return this.httpCLient.get(`${this.url}/oneEmployee/${id}`);
  }

  editOneEmployee(id,employee){
    const employeeData = new FormData();
    employeeData.append("first_name",employee.first_name);
    employeeData.append("last_name",employee.last_name);
    employeeData.append("cin",employee.cin);
    employeeData.append("tel",employee.tel);
    employeeData.append("picture",employee.picture);
    employeeData.append("cnss",employee.cnss);
    employeeData.append("adrress",employee.adrress);
    employeeData.append("age",String(employee.age));
    employeeData.append("birth_place",employee.birth_place);
    return this.httpCLient.put(`${this.url}/editEmployee/${id}`,employeeData);
  }
  editOutDateEmployee(id,date){
    return this.httpCLient.patch(`${this.url}/outDate/${id}`,date);
  }

  deleteEmployee(id){
    return this.httpCLient.delete(`${this.url}/deleteEmployee/${id}`);
  }

  editSoldeEmployee(id, solde){
    return this.httpCLient.patch(`${this.url}/editSolde/${id}`,solde);
  }
  editConsomationEmployee(id, conso){
    return this.httpCLient.patch(`${this.url}/editConsumSold/${id}`,conso);
  }

  getAllHolidays(){
    return this.httpCLient.get(`${this.url}/allHolidays`);
  }

  getOneHoliday(id){
    return this.httpCLient.get(`${this.url}/oneHoliday/${id}`);
  }

  addHolidayToEmployee(holiday,id){
    return this.httpCLient.post(`${this.url}/addHoliday/${id}`,holiday)
  }
  editHolidayToEmployee(holiday,id,id_hol){
    return this.httpCLient.put(`${this.url}/editHoliday/${id}/${id_hol}`,holiday)
  }
  deleteHoliday(id){
    return this.httpCLient.delete(`${this.url}/deleteHoliday/${id}`);
  }

  editConsumEmployee(id,consum){
    return this.httpCLient.patch(`${this.url}/editConsumSold/${id}`,consum);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthStatusListener(etat: boolean) {
    this.authStatusListener.next(etat);
  }
  

  getLogin(admin:Admin) {
    return this.httpCLient.post(`${this.url}/loginAdmin`,{login: admin.login,password:admin.password});
  }


  getToken() {
    return !!localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getAdminConnected(id){
    return this.httpCLient.get(`${this.url}/getAdmin/${id}`);
  }

}
