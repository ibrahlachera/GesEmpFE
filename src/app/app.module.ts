import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InfosPageComponent } from './Components/infos-page/infos-page.component';
import { ListEmployeesComponent } from './Components/list-employees/list-employees.component';
import { ListHolidaysComponent } from './Components/list-holidays/list-holidays.component';
import { ListEmployeesOutComponent } from './Components/list-employees-out/list-employees-out.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShowEmployeeComponent } from './Components/show-employee/show-employee.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    InfosPageComponent,
    ListEmployeesComponent,
    ListHolidaysComponent,
    ListEmployeesOutComponent,
    ShowEmployeeComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
