import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appConstants } from 'src/app/app.constants';
import { AuthService } from 'src/app/auth/auth.service';
import { loginData } from 'src/app/model/loginData';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  login: loginData = { username: '', password: ''};
  loginError: any;


  constructor( private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.login = { username: '', password: ''};
  }

  submit() {
    console.log(JSON.stringify(this.login));
    //vado ad utilizzare la funzione 'authenticate' per esaminare i dati di login 
    this.authService.authenticate(this.login).subscribe(res => {
      console.log(res);
      localStorage.setItem(appConstants.LOGIN_STORAGE, JSON.stringify(res));
      this.router.navigate(['books']);
    }, error => {
       this.loginError = error;
    });
  }

}
