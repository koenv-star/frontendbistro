import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Advertenties} from '../models/advertenties';



const ADVERTENTIE_URL =  'http://localhost:8080/Advertenties';
@Injectable({
  providedIn: 'root'
})
export class AdvertentiesService {


  constructor(private http: HttpClient,
              private router: Router) {
  }

  saveAdvertentie(advertentie: Advertenties){
    return this.http.post<Advertenties>(ADVERTENTIE_URL, advertentie);
  }

  getAllAdvertenties(){
    return this.http.get(ADVERTENTIE_URL);
  }
}
