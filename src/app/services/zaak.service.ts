import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zaak } from '../models/zaak';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZaakService {
  private backendUrl:string = "http://localhost:4200/zaken";

  
  constructor(private http: HttpClient) { }


  public getZaak(id:number) :Observable<Object>{
    console.log( this.http.get(this.backendUrl + "/" + id).subscribe());
    return this.http.get(this.backendUrl + "/" + id);
  }
}
