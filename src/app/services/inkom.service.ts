import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BestellenService} from './bestellen.service';
import {Inkom} from '../models/Inkom';


const INKOM_URL = 'http://localhost:8080/inkoms/';
@Injectable({
  providedIn: 'root'
})
export class InkomService {

  constructor(private http:HttpClient,
              private serviceBestellen: BestellenService) {

  }



  getInkomsAll(email:string){
    return this.http.get<Inkom[]>(INKOM_URL+email);
  }
  getInkomsByZaakId(zaakId: number){
    return this.http.get<Inkom>(INKOM_URL+"id/"+ zaakId);
  }

}
