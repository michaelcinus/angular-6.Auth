import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConstants } from '../app.constants';
import { Book } from '../model/book';

const baseUrl = `${appConstants.SERVICES_BASE_URL}/v1/books/`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor( private http: HttpClient) { }

   getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl);
  }
}
