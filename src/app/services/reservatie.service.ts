import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservatie } from '../models/reservatie';
const RESERVATIE_URL = 'http://localhost:8080/reservatie';
@Injectable({
  providedIn: 'root',
})
export class ReservatieService {
  getReservatiesByZaakId(id: any) {
    let url = `${RESERVATIE_URL}/zaak/${id}`;

    return this.http.get<Reservatie[]>(url);
  }

  constructor(private http: HttpClient) {}
}
