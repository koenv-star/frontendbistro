import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Costumer } from '../models/costumer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const LOGIN_URL = 'http://localhost:8080/login';
const REG_URL = 'http://localhost:8080/klanten/register';
const LIST_URL = 'http://localhost:8080/klanten';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '<origin>',
  // 'Access-Control-Allow-Methods': 'PUT, POST, PATCH, DELETE',
  // 'Access-Control-Allow-Headers': 'Origin',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'withCredentials': 'true',

  // 'Access-Control-Allow-Origin': '<origin>',
  //     'Access-Control-Allow-Methods': 'PUT, POST, PATCH, DELETE',
  //     'Access-Control-Allow-Headers': 'Origin',
  //     'Access-Control-Expose-Headers': '*,Authorization'

  authenticate(username, password): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      LOGIN_URL,
      {
        username: username,
        password: password,
      },
      { headers: httpHeaders, observe: 'response' }
    );
  }


 

  list(): Observable<Costumer[]> {
    return this.http.get<Costumer[]>(LIST_URL);
  }
}
