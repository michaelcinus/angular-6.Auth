import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { appConstants } from '../app.constants';
import { loginData } from '../model/loginData';
import { loginResult } from '../model/loginResult';

const baseUrl = `${appConstants.SERVICES_BASE_URL}/auth/signin`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  public authenticate( loginData: loginData): Observable<loginResult> {
    return this.httpClient
      .post<loginResult>(baseUrl, loginData )
      .pipe(catchError(this.handleError));
  };

  //funzione che porta i dati di login a '' quinfi non validi
  public logout() {
    localStorage.setItem(appConstants.LOGIN_STORAGE, '');
  }

  public isAuthenticated(): boolean {
    let login: loginResult;
    //immagazino i dati di login in locale
    let loginStr: string | null = localStorage.getItem(
      appConstants.LOGIN_STORAGE
    );

    //verifico che i dati non siano vuoti/nulli/undefined, se non lo sono li trasformo in stringa
    if (loginStr !== '' && loginStr !== null && loginStr !== undefined) {
      login = JSON.parse(loginStr);
    } else {
      return false;
    }

    //estrapolo il token
    const token = login.token;

    //verifico che il token sia valido/non scaduto
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem(appConstants.LOGIN_STORAGE, '');
    }
    return !this.jwtHelper.isTokenExpired(token);


  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
