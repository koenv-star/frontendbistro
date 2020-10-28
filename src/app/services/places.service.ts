import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Gemaakt door Jan
 */
@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesBaseUrl: string = 'https://api.basisregisters.vlaanderen.be/v1';
  private zipcodesBaseUrl = "../../assets/json/zipcode-belgium.json";
  private httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'x-api-key': '950f3581-139e-45e4-bca3-18b006335d71'
  });

  constructor(private http: HttpClient) {  }

  getPlaces(): Observable<any> {

    return this.http.get<any>(this.placesBaseUrl + "/gemeenten?limit=500", {headers: this.httpHeaders});
  }

  getZipcodes(): Observable<any> {
    return this.http.get<any>(this.zipcodesBaseUrl);
  }

  getStreetsByCommunity(community: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/straatnamen/?gemeentenaam=${community}`, {headers: this.httpHeaders});
  }
}
