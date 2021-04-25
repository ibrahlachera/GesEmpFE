import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ShowEmployeeComponent } from './Components/show-employee/show-employee.component';
import { AuthGuard } from './Guard/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full',canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path: 'home',component:HomePageComponent, canActivate:[AuthGuard]},
  {path:'show-employee/:id', component:ShowEmployeeComponent,canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
