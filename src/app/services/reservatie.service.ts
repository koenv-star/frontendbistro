import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservatie } from '../models/reservatie';
import { Reservatieresponse } from '../models/reservatieresponse';
const RESERVATIE_URL = 'http://localhost:8080/reservatie';
@Injectable({
  providedIn: 'root',
})
export class ReservatieService {
  deleteById(id: string) {
    let url=`${RESERVATIE_URL}/${id}`;
    console.log(url);
    return this.http.delete<Reservatieresponse>( url );
  }
  getReservatiesByZaakId(id: any) {
    let url = `${RESERVATIE_URL}/zaak/${id}`;

    return this.http.get<Reservatie[]>(url);
  }

  constructor(private http: HttpClient) {}

  postReservatie(reservatie: Reservatieresponse) {
    return this.http.post<Reservatieresponse>(RESERVATIE_URL, reservatie);
  }
}
