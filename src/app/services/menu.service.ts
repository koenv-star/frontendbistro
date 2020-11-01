import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Zaak} from '../models/zaak';


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  MENU_URL = 'http://localhost:8080/zaken/zaak';

  constructor(private http: HttpClient) {}

  showMenuofShop(zaaknaam: String) {
    let url = `${this.MENU_URL}/${zaaknaam}`;
    return this.http.get<Zaak>(url);
  }
}
