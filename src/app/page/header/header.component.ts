import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //funzione che mi permette di visualizzare il tasto per il logout
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  //funzione che porta i dati di login a '' e indirizza alla pagina di login
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
