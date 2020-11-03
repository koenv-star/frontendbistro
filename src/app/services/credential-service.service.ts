import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Uitbater} from '../models/uitbater';
import {Klant} from '../models/klant';

const KLANT_URL = 'http://localhost:8080/klanten/';
const UITBATER_URL = 'http://localhost:8080/uitbaters/';
@Injectable({
  providedIn: 'root'
})
export class CredentialServiceService {
  owner: Uitbater;
  costumer: Klant;

  constructor(private http: HttpClient) {
  }

  getCostumerCredentials(email: string) {
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<Klant>(KLANT_URL + email);
  }

  getOwnerCredentials(email: string) {
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<Uitbater>(
      UITBATER_URL + email);
  }
}
