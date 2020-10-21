import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const LOGIN_URL = 'http://localhost:8080/login';
const REG_URL = 'http://localhost:8080/klanten/register';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(username, password): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '<origin>',
      'Access-Control-Allow-Methods': 'PUT, POST, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Origin',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': 'true',
    });

    return this.http.post(
      LOGIN_URL,
      {
        username: username,
        password: password,
      },
      { headers: httpHeaders },
      
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      REG_URL,
      {
        voornaam: user.surname,
        naam: user.name,
        email: user.email,
        paswoord: user.password,
      },
      httpOptions
    );
  }
}
