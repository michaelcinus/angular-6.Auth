import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { loginResult } from './model/loginResult';
import { appConstants } from './app.constants';
import { BookPageComponent } from './page/book-page/book-page.component';

//verifico i dati di login e restituisco il token da verificare
export function tokenGetter() {
  let loginStored: loginResult;

  let loginStr: string | null = localStorage.getItem(
    appConstants.LOGIN_STORAGE
  );

  if (loginStr !== '' && loginStr !== null && loginStr !== undefined) {
    loginStored = JSON.parse(loginStr);
  } else {
    return '';
  }

  return loginStored.token;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginPageComponent,
    BookPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      // HTTP_INTERCEPTOR (aggiunge l'Authorization header con Bearer token JWT)
      config: {
        tokenGetter,
        allowedDomains: ['sviluppo.jdk.it:7070'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
