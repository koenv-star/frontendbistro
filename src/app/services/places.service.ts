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

  private placesBaseUrl: string = 'http://localhost:8080/places';
  private openRouteBaseUrl: string = 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf624894c2d3d5a31949b29250caf89d037ce9';

  constructor(private http: HttpClient) {  }

  getPlaces(): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl);
  }

  getZipcodeByCommunity(community: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/zipcode?community=${community}`);
  }

  getStreetsByCommunity(community: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/streets?community=${community}`);
  }

  getBusNumbers(zipcode: number, street: string): Observable<any> {
    return this.http.get<any>(this.placesBaseUrl + `/numbers?zipcode=${zipcode}&street=${street}`);
  }

  getCoordinatesFromAddress(adres: Adres): Observable<any> {
    return this.http.get<any>(this.openRouteBaseUrl + `&text=${adres.straat} ${adres.huisNr} ${adres.postcode} ${adres.gemeente}&boundary.country=BE`);
  }
}
