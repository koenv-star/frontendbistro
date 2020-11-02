import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Klant} from '../models/klant';


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
  userChange$ = new BehaviorSubject({email: null, role: null});
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




  list(): Observable<Klant[]> {
    return this.http.get<Klant[]>(LIST_URL);
  }
}
