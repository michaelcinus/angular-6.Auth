import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { BookPageComponent } from './page/book-page/book-page.component';
import { HomeComponent } from './page/home/home.component';
import { LoginPageComponent } from './page/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'books', component: BookPageComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
