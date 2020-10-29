import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Owner} from '../models/owner';
import {Costumer} from '../models/costumer';
import {Observable} from 'rxjs';

const KLANT_URL = 'http://localhost:8080/klanten/';
const UITBATER_URL = 'http://localhost:8080/uitbaters/';
@Injectable({
  providedIn: 'root'
})
export class CredentialServiceService {
  owner: Owner;
  costumer: Costumer;

  constructor(private http: HttpClient) {
  }

  getCostumerCredentials(email: string) {
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<Costumer>(KLANT_URL + email);
  }

  getOwnerCredentials(email: string) {
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<Owner>(
      UITBATER_URL + email);
  }


}
