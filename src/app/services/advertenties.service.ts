import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Advertenties} from '../models/advertenties';
import {share} from 'rxjs/operators';
import {Zaak} from '../models/zaak';



const ADVERTENTIE_URL =  'http://localhost:8080/advertenties';
@Injectable({
  providedIn: 'root'
})
export class AdvertentiesService {


  constructor(private http: HttpClient,
              private router: Router) {
  }


  getAllAdvertenties(){
    return this.http.get<Advertenties[]>(ADVERTENTIE_URL);
  }
  getAdvertentieById(adNo: number) {
    return this.http.get<Advertenties>(ADVERTENTIE_URL+"/"+adNo);
  }
  getAdvertentiesLength(){
    return this.http.get<number>(ADVERTENTIE_URL+"/"+"AdvertentiesLength");
  }
  getZaakByAdvertentieId(adNo: number) {
    return this.http.get<Zaak>(ADVERTENTIE_URL+"/Zaak/"+adNo);
  }
  saveAdvertentie(advertentie: Advertenties){
    return this.http.post<Advertenties>(ADVERTENTIE_URL, advertentie);
  }
}
