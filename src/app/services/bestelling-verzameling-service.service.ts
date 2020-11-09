import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BestellingVerzameling } from '../models/bestelling-verzameling';

@Injectable({
  providedIn: 'root'
})
export class BestellingVerzamelingService {

  private url:string = "http://localhost:8080/bestellingVerzameling";

  constructor(private http:HttpClient) { }

  public getBestellingVerzamelingById(id:number): Observable<BestellingVerzameling>{
    return this.http.get<BestellingVerzameling>(this.url + '/' + id);
  }
}
