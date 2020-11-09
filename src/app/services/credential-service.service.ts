import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Uitbater} from '../models/uitbater';
import {Klant} from '../models/klant';
import { share } from 'rxjs/operators';

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
    return this.http.get<Klant>(KLANT_URL + email).pipe(share());
  }

  getOwnerCredentials(email: string) {
    // let httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.get<Uitbater>(
      UITBATER_URL + email);
  }

  updateUitbater(email, uitbater: Uitbater) {
    return this.http.put<Uitbater>(
      UITBATER_URL + email, uitbater);
  }

  updateKlant(email, klant: Klant) {
    return this.http.put<Klant>(KLANT_URL + email, klant);
  }


}
