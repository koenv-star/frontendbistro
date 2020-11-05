import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zaak } from '../models/zaak';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZaakService {

  private zaakBaseUrl = 'http://localhost:8080/zaken';

  constructor(private http: HttpClient) { }

  getZaak(id:number) :Observable<Zaak>{
    return this.http.get<Zaak>(this.zaakBaseUrl + "/zaak/id=" + id);
  }

  getAllZaken(): Observable<Zaak[]> {
    return this.http.get<Zaak[]>(this.zaakBaseUrl);
  }

  getZakenBijUitbaterEmail(email: String) {
    let url = `${this.zaakBaseUrl}/${email}`;
    return this.http.get<Zaak[]>(url);
  }

  postZaak(formData: FormData): Observable<Zaak> {

    let httpHeaders = new HttpHeaders({
      'Content-Disposition': 'form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    });

    return this.http.post<Zaak>(this.zaakBaseUrl, formData, {headers: httpHeaders});
  }

  showMenuofShop(zaaknaam: String) {
    let url = `${this.zaakBaseUrl}/zaak/${zaaknaam}`;
    return this.http.get<Zaak>(url);
  }

}
