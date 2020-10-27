import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Costumer } from '../models/costumer';
import { Owner } from '../models/owner';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const REGKLANT_URL = 'http://localhost:8080/klanten';
const REG_UITBATER_URL = 'http://localhost:8080/uitbaters';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }
  
  registerUitbater(newOwner: Owner) {

    return this.http.post(
      REG_UITBATER_URL,
      {
         newOwner
      },
      httpOptions
    );
   
  }


  registerklant(costumer: Costumer ): Observable<any> {
    return this.http.post(
      REGKLANT_URL,
      {
       costumer
      },
      httpOptions
    );
  }
}
