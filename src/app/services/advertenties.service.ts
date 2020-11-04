import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Advertenties} from '../models/advertenties';



const ADVERTENTIE_URL =  'http://localhost:8080/advertenties';
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
    return this.http.get<Advertenties[]>(ADVERTENTIE_URL);
  }

  updateAdvertentie(adId,advertentie: Advertenties) {
    return this.http.put<Advertenties>(ADVERTENTIE_URL +"/"+ adId, advertentie);
  }

  deleteAdvertentei(id: number) {
    return this.http.delete(ADVERTENTIE_URL +"/"+id);
  }
}
