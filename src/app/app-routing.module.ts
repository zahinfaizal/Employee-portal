import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [{ 
  // http://localhost:4200/users
  path: 'users',canActivate:[authGuard], loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  // http://localhost:4200/
  {
    path:'',component:LoginComponent
  },
  // http://localhost:4200/dashboard
  {
    path:'dashboard',component:HomeComponent ,canActivate:[authGuard]
  },
  {
    path:'**', redirectTo:""
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
