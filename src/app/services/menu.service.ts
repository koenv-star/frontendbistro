import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  MENU_URL = 'http://localhost:8080/zaken/zaak';

  constructor(private http: HttpClient) {}

  showMenuofShop(shopname: String) {
    let url = `${this.MENU_URL}/${shopname}`;
    return this.http.get<Shop>(url);
  }
}
