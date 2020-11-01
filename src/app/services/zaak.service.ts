import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zaak } from '../models/zaak';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZaakService {
  private backendUrl:string = "http://localhost:8080/zaken";
  ZAKEN_URL = 'http://localhost:8080/zaken';


  constructor(private http: HttpClient) { }


  public getZaak(id:number) :Observable<Zaak>{
    return this.http.get<Zaak>(this.backendUrl + "/zaak/id=" + id);
  }
  getZakenBijUitbaterEmail(email: String) {
    let url = `${this.ZAKEN_URL}/${email}`;

    return this.http.get<Zaak[]>(url);
  }
}
