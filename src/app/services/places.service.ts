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

  private placesBaseUrl: string = 'https://api.basisregisters.vlaanderen.be/v1/gemeenten';

  constructor(private http: HttpClient) {  }

  getPlaces(): Observable<any> {

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'x-api-key': '950f3581-139e-45e4-bca3-18b006335d71'
    });

    return this.http.get<any>(this.placesBaseUrl, {headers: httpHeaders});
  }
}
