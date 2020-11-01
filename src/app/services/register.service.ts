import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Uitbater} from '../models/uitbater';
import {Klant} from '../models/klant';




const REGKLANT_URL = 'http://localhost:8080/klanten';
const REG_UITBATER_URL = 'http://localhost:8080/uitbaters';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUitbater(newOwner: Uitbater) {

    return this.http.post<Uitbater>(
      REG_UITBATER_URL,newOwner)
  }

  registerklant(newcostumer: Klant): Observable<any> {

    return this.http.post<Klant>(REGKLANT_URL, newcostumer);

}
}
