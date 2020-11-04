import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adres } from '../models/adres';

/**
 * Gemaakt door Jan
 */
@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesBaseUrl: string = 'https://api.basisregisters.vlaanderen.be/v1';
  private nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search.php';
  private httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'x-api-key': '950f3581-139e-45e4-bca3-18b006335d71'
  });

  constructor(private http: HttpClient) {  }

  getPlaces(): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + "/gemeenten?limit=500", {headers: this.httpHeaders});
  }

  getZipcodeByCommunity(community: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/postinfo?gemeentenaam=${community}`, {headers: this.httpHeaders});
  }

  getStreetsByCommunity(community: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/straatnamen?gemeentenaam=${community}&limit=10000`, {headers: this.httpHeaders});
  }

  getBusNumbers(zipcode: number, street: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/adressen?postcode=${zipcode}&straatnaam=${street}`, {headers: this.httpHeaders});
  }

  getCoordinatesFromAddress(adres: Adres): Observable<any> {
    return this.http.get<any>(this.nominatimBaseUrl + `?street=${adres.huisNr} ${adres.straat}&city=${adres.gemeente}&postalcode=${adres.postcode}&country=Belgium&format=json`);
  }
}
